app.controller('ProfileCtrl', function ($scope, $http, $rootScope, $routeParams) {
    
   

  
    
    $(function () {
        var currentuserfetch = $rootScope.currentUser.username;
        $http.post('/fetch/followers/' + currentuserfetch )
        .success(function (response) {
            $scope.follow = response;

            console.log($scope.follow);
            console.log($scope.follow.following);
            console.log($scope.follow.follower);
            
        });

    })

    $(function () {
        var currentuserfetch = $rootScope.currentUser.username;
        $http.post('/fetch/reviews/' + currentuserfetch)
        .success(function (response) {
            $scope.reviewmodel = response;

          
        });

    })

    $(function () {
        var currentuserfetch = $rootScope.currentUser.username;
        $http.post('/fetch/favmovies/' + currentuserfetch)
        .success(function (response) {
            $scope.favmovies = response;

           
        });

    })


    $(function () {
        var currentuserfetch = $rootScope.currentUser.username;
        $http.post('/userdetails/' + currentuserfetch)
        .success(function (response) {
            $scope.userprofile = response;

         
        });

    })


    $scope.followuser = function (user, currentuser) {
        $http.post('/rest/user/follow/' + user.username + '/' + currentuser.username)
            .success(function (response) {
                $scope.follow = response;
                
                console.log($scope.follow);
                console.log($scope.follow.following);
                console.log($scope.follow.follower);
               // $rootScope.favoriteMoviesr = response;
                
            });
    }
    $scope.unfollowuser = function (user, currentuser) {
        $http.post('/rest/user/unfollow/' + user.username + '/' + currentuser.username)
            .success(function (response) {
                $scope.follow = response;
                console.log($scope.follow);
                console.log($scope.follow.following);
                console.log($scope.follow.follower);
                // $rootScope.favoriteMoviesr = response;

            });
    }



    $scope.detailsMovie = function (movie) {
        $http.jsonp("http://www.myapifilms.com/imdb?format=JSONP&idIMDB=" + movie.idIMDB + "&callback=JSON_CALLBACK")
        .success(function (movie) {
            $scope.details = movie;
        });
    }


    $scope.usercommunicate = function (currentUser, user, msg)
    {

    }

});