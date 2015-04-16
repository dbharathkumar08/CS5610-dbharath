var app = angular.module("MoviesApp", []);

function myapifilms(response) {
    alert(response);
}


app.controller("MovieController", function ($scope, $http) {

    $scope.favoriteMovies = [];

    $scope.addToFavorites = function (movie) {
        $scope.favoriteMovies.push(movie);
    }

  
    $scope.searchMovies = function () {

        $http.jsonp("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?apikey=m8r83jtnrvy92y4w5hxm39cb&callback=JSON_CALLBACK")
        .success(function (response) {
            console.log(response);
            $scope.movies = response.movies;
        })
    }


    $scope.removeMovie = function (movie) {
        var index = $scope.movies.indexOf(movie);
        $scope.movies.splice(index, 1);
    }

    $scope.selectMovie = function (movie) {
        $scope.movie = movie;
    }

    
});
