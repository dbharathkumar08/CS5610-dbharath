var app = angular.module("MoviesApp", []);

app.controller("MovieController",
    function ($scope, $http) {

        

    var movies = [
        { title: "Indian", rating: "U/A", year: 1999, plot: "Patriot working for the country" },
        { title: "Raja Hindustani", rating: "U", year: 1992, plot: "A romantic love story" },
        { title: "Roja", rating: "U", year: 1990, plot: "Movie based on two ppl living far off" }
    ];

    $scope.movies = movies;

    $scope.addMovie = function()
    {
        var newMovie = {
            title: $scope.movie.title,
            rating: $scope.movie.rating,
            year: $scope.movie.year,
            plot: $scope.movie.plot
        };
        $scope.movies.push(newMovie);
    }

    $scope.removeMovie = function(movie)
    {
        var index = $scope.movies.indexOf(movie);
        $scope.movies.splice(index, 1);
    }

    $scope.selectMovie = function(movie)
    {
        $scope.movie = movie;
    }

    $scope.updateMovie = function()
    {
        
    }
});
