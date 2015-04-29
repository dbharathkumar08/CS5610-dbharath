app.controller("NavCtrl", function ($scope, $http, $location, $modal,$rootScope) {


    $scope.loginm = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'

        });
    };
    //signup Modal
    $scope.signupm = function () {
        $modal.open({
            templateUrl: 'views/register/register.html',
            controller: 'RegisterCtrl'

        });
    }


   $scope.logout = function(){
       $http.post("/logout")
       .success(function(){
           $rootScope.currentUser = null;
           $location.url("/home");
       });
   } 
});