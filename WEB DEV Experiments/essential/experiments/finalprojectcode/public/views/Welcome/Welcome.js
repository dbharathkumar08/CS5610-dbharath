/*
var app = angular.module("MoviesApp", []);

function myapifilms(response) {
    alert(response);
}
*/

app.controller('WelcomeCtrl', function ($scope, $http) {

    $scope.detailsMovie = function (movie) {
        $http.jsonp("http://www.myapifilms.com/imdb?format=JSONP&idIMDB=" + movie.idIMDB + "&callback=JSON_CALLBACK")
        .success(function (movie) {
            $scope.details = movie;
        });
    }

    // $scope.favoriteMovies = [];
    // $scope.movies = [];

    /*  $scope.addToFavorites = function(movie)
      {
          $scope.favoriteMovies.push(movie);
      }*/

    $scope.addToFavorites = function (movie, user) {
        $http.post('/Movie/fav/' + movie.idIMDB + '/' + user.username)
            .success(function (response) {
                $scope.favoriteMovies = response;
            });
    }

    /*   $scope.removeFavoriteMovie = function (movie) {
           var index = $scope.favoriteMovies.indexOf(movie);
           $scope.favoriteMovies.splice(index, 1);
       } */
    /*  $scope.remove = function (index) {
          $http.delete('/cricketer/' + index)
          .success(function (response) {
              $scope.cricketers = response;
          });
      }; */

    $scope.removeFavoriteMovie = function (movie) {
        console.log(movie.idIMDB);
        $http.delete('/Movie/favdelete/' + movie.idIMDB)

            .success(function (response) {
                $scope.favoriteMovies = response;
            });
    }


    $scope.searchMovies = function () {
        var title = $scope.searchByTitle;
        $http.jsonp("http://www.myapifilms.com/imdb?title=" + title + "&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=10&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&callback=JSON_CALLBACK")
        .success(function (response) {
            $scope.movies = response;
        })
    }

    $scope.searchComingSoon = function () {
        // var title = $scope.searchByTitle;
        $http.jsonp("http://www.myapifilms.com/imdb/comingSoon")
        .success(function (response) {
            $scope.comingsoonmovies = response;
        })
    }


    /*
var movies = [
    { title: "Avatar", rating: "PG-13", year: 2009, plot: "Come cool blue guys re-enact Dancing with Wolfs" },
    { title: "Star Wars VII", rating: "PG-13", year: 2015, plot: "Plot Unkown" },
    { title: "Star Trek", rating: "PG-13", year: 2013, plot: "Citizen what is your name" }
];

$scope.movies = movies;
*/
    /*    $scope.addMovie = function()
        {
            var newMovie = {
                title: $scope.movie.title,
                rating: $scope.movie.rating,
                year: $scope.movie.year,
                plot: $scope.movie.plot
            };
            $scope.movies.push(newMovie);
        } */
    $scope.addMovie = function () {
        var newMovie = {
            title: $scope.movie.title,
            rating: $scope.movie.rating,
            year: $scope.movie.year,
            plot: $scope.movie.plot
        };

        $http.post('/Movie', movie)
        .success(function (response) {
            $scope.movies = response;
        });
    };







    $scope.selectMovie = function (movie) {
        $scope.movie = movie;
    }

    $scope.updateMovie = function () {
        alert($scope.movie.title);
    }
});
