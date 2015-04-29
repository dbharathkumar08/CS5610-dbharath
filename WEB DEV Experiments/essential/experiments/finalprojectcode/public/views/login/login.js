app.controller("LoginCtrl", function ($scope, $http, $location, $rootScope, $modal, $modalInstance) {
  
  
    $scope.color = "btn btn-success";
    $scope.login = function (user) {

        $http.post("/login", user)
        .success(function (response) {
            console.log(response);
            if (response != null) {
                $rootScope.currentUser = response;
                $location.url("/profile");
                $scope.color = "btn btn-success";
            }
            else {
                $rootScope.message = "Wrong username or password";
                $scope.color = "btn btn-danger";
                $scope.user.username = "";
                $scope.user.password = "";
            }
        
            $modalInstance.close();
            $location.url("/home");
        });
    }
});