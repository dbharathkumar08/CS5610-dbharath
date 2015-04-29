var app = angular.module("CricketApp", []);

app.controller("CricketController", function ($scope, $http) {

    $http.get('/cricketer')
   .success(function (response) {
       $scope.cricketers = response;
   });

    $scope.remove = function (index) {
        $http.delete('/cricketer/' + index)
        .success(function (response) {
            $scope.cricketers = response;
        });
    };

    $scope.add = function (cricketer) {

        $http.post('/cricketer', cricketer)
        .success(function (response) {
            $scope.cricketers = response;
        });
    };

    $scope.selectedIndex = null;
    $scope.select = function (index) {
        $scope.selectedIndex = index;
        $scope.cricketer = $scope.cricketers[index];
    };

    $scope.update = function (cricketer) {
        $http.put('/developer/' + $scope.selectedIndex, cricketer)
        .success(function (response) {
            $scope.cricketers = response;
        });
    };
});