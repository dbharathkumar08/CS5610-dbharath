var app = angular.module('APIApp', []);

app.controller('APICtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('http://api.themoviedb.org/3/genre/movie/list?api_key=9f8133856d865923b1fdce653c15f5c3')
       .success(function (response) {
           console.log(response);
           $scope.genres = response.genres;
       })

    $scope.moviesByGenreId = {};
    $scope.postersByGenreId = {};

    $scope.fetchTitles = function (genreId) {
        console.log(genreId);
        $http.get('http://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=9f8133856d865923b1fdce653c15f5c3&page_size=1')
          .success(function (response) {
              console.log(response);
              $scope.moviesByGenreId[genreId] = response.results;
              fetchPosters();
          });
    }

    var fetchPosters = function () {
        //for each genreId.arrayofmovieresults, extract posterid, form posterurl and set in postersarray
        for (var genreId in $scope.moviesByGenreId) {
            var array = $scope.moviesByGenreId[genreId];
            $scope.postersByGenreId[genreId] = [];
            for (var i = 0; i < array.length; i++) {
                var posterURL = 'http://image.tmdb.org/t/p/w500/' + array[i].poster_path + '?api_key=9f8133856d865923b1fdce653c15f5c3';
                console.log(posterURL);
                $scope.postersByGenreId[genreId].push(posterURL);
            }
        }
    }

    $scope.fetchMovieInfo = function (id) {
        $http.get('http://api.themoviedb.org/3/movie/' + id + '?api_key=9f8133856d865923b1fdce653c15f5c3')
          .success(function (response) {
              console.log(response);
              $scope.overview = response.overview;
              // $scope.poster = 'http://image.tmdb.org/t/p/w500/' + response.poster_path + '?api_key=9f8133856d865923b1fdce653c15f5c3';
          });
    }
}]);