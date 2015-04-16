

var app = angular.module("MoviesApp", []);



app.controller("MovieController", function ($scope, $http) {

    $scope.favoriteMovies = [];

    $scope.addToFavorites = function (movie) {
        $scope.favoriteMovies.push(movie);
    }

    function user_selection1(valueToSelect) {
        $scope.url = document.getElementById('leaveCode').value;
    }
    

    $scope.searchMovies = function () {

        $http.jsonp("http://api.rottentomatoes.com/api/public/v1.0/lists/dvds.json?apikey=m8r83jtnrvy92y4w5hxm39cb&callback=JSON_CALLBACK")
        .success(function (response) {
            console.log(response);
            $http.jsonp(response.links.$scope.url+"?apikey=m8r83jtnrvy92y4w5hxm39cb&callback=JSON_CALLBACK")
        .success(function (response) {
            console.log(response);

            $scope.movies = response.movies;
        });
        });
    }


    $scope.removeMovie = function (movie) {
        var index = $scope.movies.indexOf(movie);
        $scope.movies.splice(index, 1);
    }

    $scope.selectMovie = function (movie) {
        $scope.movie = movie;
    }


});
