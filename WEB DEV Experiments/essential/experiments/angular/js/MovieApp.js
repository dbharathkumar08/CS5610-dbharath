var app = angular.module("MovieApp", []);
app.controller("MovieController", function ($scope) {
    $scope.hello = "Hello from the controller";
    var movie = [
        { name: "Avatar", year: "2009", genre: "Sci-Fiction", plot: "Blue guy in the war" },
        { name: "Om", year: "1994", genre: "Action", plot: "Shiv Raj Kumar in the lead" },
        { name: "Shabdavedi", year: "2000", genre: "Thriller", plot: "Raj Kumar in the lead" },
        { name: "Akasmika", year: "1992", genre: "Romance", plot: "Raj Kumar in the lead" },
    ];
    $scope.movies = movie;
    $scope.removeMovie = function (movie) {
        var index = $scope.movies.indexOf(movie);
        $scope.movies.splice(index, 1);
    }
7
});