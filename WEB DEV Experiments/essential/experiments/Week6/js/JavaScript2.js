var app = angular.module("sportsApp", []);

app.controller("sportController",
    function ($scope, $http) {

        alert("Successfully Loaded");

    var sports = [
        { name: "Cricket", popularity: "95", country: "India", description: "Game played in a oval shaped stadium with a bat and ball" },
        { name: "Tennis", popularity: "50", country: "India", description: "Played in a tectangle court, Racket and ball is required" },
        { name: "Hockey", popularity: "60", country: "India", description: "Played in a round shaped ground.Requires Hockey stick and ball" }
    ];

    $scope.sports = sports;

    $scope.addsport = function()
    {
        var newsport = {
            name: $scope.sport.name,
            popularity: $scope.sport.popularity,
            country: $scope.sport.country,
            description: $scope.sport.description
        };
        $scope.sports.push(newsport);
    }

    $scope.removesport = function(sport)
    {
        var index = $scope.sports.indexOf(sport);
        $scope.sports.splice(index, 1);
    }

    $scope.selectsport = function(sport)
    {
        $scope.sport = sport;
    }

    $scope.updatesport = function()
    {
        alert($scope.sport.name);
    }
});