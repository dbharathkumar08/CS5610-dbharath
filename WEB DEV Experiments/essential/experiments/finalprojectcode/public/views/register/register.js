app.controller("RegisterCtrl", function ($scope, $http, $location, $rootScope, $timeout, $modalInstance, $modal) {





    $scope.color = "btn btn-success";
    $rootScope.message = ""
    $scope.register = function (user) {
        console.log(user);
        if (user.password != user.password2 || !user.password || !user.password2) {
            $rootScope.message = "Your passwords don't match";
            $scope.color = "btn btn-danger";
            $scope.user.username = "";
            $scope.user.password = "";
            $scope.user.password2 = "";
        }
        else {
            $http.post("/register", user)
            .success(function (response) {
               
                if (response != null) {
                    $rootScope.currentUser = response;
                    $scope.color = "btn btn-success";
                    $rootScope.message = "User Registered Successfully!"
                   
                    $location.url("/profile");
                    // $modalInstance.close();
                    $timeout(function () {
                        $modalInstance.close();
                    }, 500);
                }
                else {
                    $rootScope.message = "username already exists, Choose a different username";
                    $scope.color = "btn btn-danger";
                    $scope.user.username = "";
                    $scope.user.password = "";
                    $scope.user.password2 = "";

                }
            });
        }
    };





});
