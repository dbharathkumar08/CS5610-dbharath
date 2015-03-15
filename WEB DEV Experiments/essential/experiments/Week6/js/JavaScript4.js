angular.module('myApp', []).controller('formController', ['$scope', function ($scope) {
    $scope.master = { firstName: "Bhagat", lastName: "Singh" };
    $scope.reset = function () {
        $scope.user = { firstName: "", lastName: "" };;
    };
   
    $scope.copymaster = function () {
        $scope.master = angular.copy($scope.user);
    };
   
    $scope.copyfrommaster = function () {
        $scope.user = angular.copy($scope.master);
    };
   
}]);