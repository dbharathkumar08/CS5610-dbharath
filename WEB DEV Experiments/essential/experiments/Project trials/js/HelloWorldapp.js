var app = angular.module("HelloWorldApp", []);
app.controller("HelloWorldController", function ($scope) {

    //$scope.hello = "Bharath Angular JS";
    var employee = {
        firstname: "alice",
        lastname: "wonderland"
    };
    $scope.employee = employee;
    var employees = [
        {firstname:"dominic" lastname:"gobin"},
        {firstname:"dominic" lastname:"gobin"},
        {firstname:"dominic" lastname:"gobin"},
];
$scope.employees=employees;

});