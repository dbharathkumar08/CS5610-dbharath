app.controller('other_profile_detailsCtrl', function ($scope, $http, $rootScope, $routeParams,$location) {



    $(function () {
        $scope.user = $routeParams.username;
    });
    //var user_id = $routeParams.username;



    
    

    $(function () {

        if (!$rootScope.currentUser) {
            $scope.show = true;
            $scope.hide = false;
        }
        else {
            var currentuserfetch = $routeParams.username;

            $http.post('/fetch/followers/' + currentuserfetch)
            .success(function (response) {
                $scope.follow = response;
                var logged_in_user = $rootScope.currentUser.username;
                console.log(logged_in_user);
                var follower_array = response.follower;
                console.log(follower_array);
                for (var j = 0; j<follower_array.length; j++) {
                    console.log(follower_array[j]);
                    if (follower_array[j] == logged_in_user) {
                        var set = true;
                        console.log("true");
                    }
                }
                if (set == true) {
                    console.log("true");
                    $scope.show = false;
                    $scope.hide = true;
                }
                else {
                    console.log("false");
                    $scope.show = true;
                    $scope.hide = false;

                }
                console.log($scope.follow);
                console.log($scope.follow.following);
                console.log($scope.follow.follower);
                //$scope.followerCount = $scope.listFollowers.length;
            });
        }
    })

    ///to set like and unlike button
/*
    $(function () {

        //for not logged in case
        if (!$rootScope.currentUser) {
            $scope.show = true;
            $scope.hide = false;
        }
        else {

            var currentuserfetch = $routeParams.username;
            var logged_in_user = $rootScope.currentUser.username;
            $http.post('/fetch/other/followers/' + currentuserfetch + '/'+ logged_in_user)
            .success(function (response) {
                console.log(response);
                if (response == "true") {
                    $scope.show = false;
                    $scope.hide = true;

                }
                else {
                    $scope.show = true;
                    $scope.hide = false;
                }               
            });
        }
    })
*/

    $(function () {
        var currentuserfetch = $routeParams.username;
        $http.post('/fetch/reviews/' + currentuserfetch)
        .success(function (response) {
            $scope.reviewmodel = response;

         
        });

    })

    $(function () {
        var currentuserfetch = $routeParams.username;
        $http.post('/fetch/favmovies/' + currentuserfetch)
        .success(function (response) {
            $scope.favmovies = response;

            
        });

    })


    $(function () {
        var currentuserfetch = $routeParams.username;
        $http.post('/userdetails/' + currentuserfetch)
        .success(function (response) {
            $scope.userprofile = response;

          
        });

    })




    $(function () {

        if (!$rootScope.currentUser) {
            $scope.sameuser = true;
            
        }
        else {

            var otheruser = $routeParams.username;
            var curuset = $rootScope.currentUser.username;
            console.log(otheruser);
            console.log(curuset);
            if (otheruser == curuset) {

                $scope.sameuser = false;
                console.log($scope.sameuser);
            } else {

                $scope.sameuser = true;
                console.log($scope.sameuser);
            }
        }
    })




    $scope.followuser = function (user, currentuser) {
        if (!$rootScope.currentUser) {

            BootstrapDialog.alert('Kindly Login to Enjoy this feature');
            $location.url('/home');
        }
        else {
            $http.post('/rest/user/other/follow/' + user + '/' + currentuser.username)
                .success(function (response) {
                    $scope.follow = response;
                    $scope.show = false;
                    $scope.hide = true;
                    console.log($scope.follow);
                    console.log($scope.follow.following);
                    console.log($scope.follow.follower);


                });
        }
    }
    $scope.unfollowuser = function (user, currentuser) {
        if (!$rootScope.currentUser) {
            BootstrapDialog.alert('Kindly Login to Enjoy this feature');
            $location.url('/home');
        }
        else {
            $http.post('/rest/user/other/unfollow/' + user + '/' + currentuser.username)
                .success(function (response) {
                    $scope.follow = response;
                    $scope.show = true;
                    $scope.hide = false;
                    console.log($scope.follow);
                    console.log($scope.follow.following);
                    console.log($scope.follow.follower);


                });
        }
    }



    $scope.detailsMovie = function (movie) {
        $http.jsonp("http://www.myapifilms.com/imdb?format=JSONP&idIMDB=" + movie.idIMDB + "&callback=JSON_CALLBACK")
        .success(function (movie) {
            $scope.details = movie;
        });
    }


    $scope.usercommunicate = function (currentUser, user, msg) {

    }

});