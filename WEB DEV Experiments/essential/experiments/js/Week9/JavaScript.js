var app = angular.module('MovieAPIAPP', []);

app.controller('MovieAPICONTROLLER', ['$scope', '$http', function ($scope, $http) {
    
  $scope.fetchGenres = function () {
    
      $http.get('http://api.themoviedb.org/3/genre/movie/list?api_key=9d0dd3bf6b5d957142fe31486e1c2c94')
      .success(function (response) {
        $scope.genres = response.genres;
        console.log(response);
      });
  }
}]);