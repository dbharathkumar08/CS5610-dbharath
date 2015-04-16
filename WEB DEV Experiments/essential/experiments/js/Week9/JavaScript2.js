
var app = angular.module('MovieAPIAPP', []);

app.controller('MovieAPICONTROLLER', ['$scope', '$http', function ($scope, $http) {

    $scope.fetchGenres = function () {
        $http.get('http://api.themoviedb.org/3/genre/movie/list?api_key=9d0dd3bf6b5d957142fe31486e1c2c94')
          .success(function (response) {
              console.log(response);
              $scope.genres = response.genres;
          });
    };

    $scope.movies = [];
    $scope.fetchTitles = function (genreId) {
        console.log(genreId);
        $http.get('http://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=9d0dd3bf6b5d957142fe31486e1c2c94&page_size=1')
          .success(function (response) {
              console.log(response);
              $scope.movies.push.apply($scope.movies, response.results);
          });
    }
}]);