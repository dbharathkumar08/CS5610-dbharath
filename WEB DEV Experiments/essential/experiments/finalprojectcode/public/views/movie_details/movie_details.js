

app.controller('movie_detailsCtrl', function ($scope, $http, $rootScope, $routeParams,$location) {


    $scope.addToFavorites = function (movie, user) {

        if (!$rootScope.currentUser) {
            BootstrapDialog.alert('Kindly Login to Enjoy this feature');
            $location.url('/home');
        }
        else {
            var bigObj = { user: user, movie: movie };

            $http.post('/Movie/fav/' + movie.idIMDB + '/' + user.username, movie)
                .success(function (response) {
                    $scope.usermovie = response;
                    $scope.show = false;
                    $scope.hide = true;
                    console.log($scope.usermovie);

                });
        }
    }



    $scope.removeFavoriteMovie = function (movie, user) {
        if (!$rootScope.currentUser) {
            BootstrapDialog.alert('Kindly Login to Enjoy this feature');
            $location.url('/home');
        }
        else {
            var bigObj = { user: user, movie: movie };
            $http.post('/Movie/favdelete/' + movie.idIMDB + '/' + user.username, bigObj)
                .success(function (response) {
                    $scope.usermovie = response;
                    $scope.show = true;
                    $scope.hide = false;

                });
        }
    }







    $scope.reviewcomment = function (movie, user, comment, userrating) {

        if (!$rootScope.currentUser) {
            BootstrapDialog.alert('Kindly Login to Enjoy this feature');
            $location.url('/home');
        }
        else {

            var newReview = {
                idIMDB: movie.idIMDB,
                title: movie.title,
                username: user.username,
                comments: comment,
                userrating: userrating

            };
            // var bigObj = { user: user, movie: movie };
            var bigObj = { movie: movie, review: newReview };

            $http.post('/Review/add', bigObj)


                .success(function (response) {
                    $scope.reviews = response;
                    console.log($scope.reviews);
                    $scope.comment = "";
                    $scope.userrating = "";
                });
        }
    }



    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / 5);
    };



    $(function () {
        var movie_id = $routeParams.idIMDB;

        $http.get('/review/detail/user/' + movie_id)
        .success(function (response) {
            $scope.reviews = response;
            console.log($scope.reviews);
        });
    })




    $(function () {
        var movie_id = $routeParams.idIMDB;
        console.log(movie_id);
        $http.jsonp("http://www.myapifilms.com/imdb?format=JSONP&idIMDB=" + movie_id + "&callback=JSON_CALLBACK")
       .success(function (movie) {
           $scope.details = movie;
       });


    })

    $(function () {
        var movie_id = $routeParams.idIMDB;

        $http.get('/Movie/detail/fav/user/' + movie_id)
            .success(function (response) {
                $scope.usermovie = response;
                console.log($scope.usermovie);

            });


    })





    $(function () {

        var movie_id = $routeParams.idIMDB;

        var username;
        if (!$rootScope.currentUser) {
            $scope.show = true;
            $scope.hide = false;
        }

        else {
            username = $rootScope.currentUser.username;
            var bigObj = {
                username: username,
                movie_id: movie_id
            };
            console.log(bigObj);

            $http.post('/getlike', bigObj)
            .success(function (resp) {
                console.log(resp);
                if (resp == null) {
                    $scope.show = true;
                    $scope.hide = false;
                }
                else {
                    $scope.show = false;
                    $scope.hide = true;
                }

            });

        }
    })
});