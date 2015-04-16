var app = angular.module('APIApp', []);

app.directive('modalDialog', function () {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true,
    transclude: true,
    link: function (scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function () {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});

app.controller('APICtrl', ['$scope', '$http', function($scope, $http) {
    
    $http.get('http://api.themoviedb.org/3/genre/movie/list?api_key=9d0dd3bf6b5d957142fe31486e1c2c94')
     .success(function (response) {
       console.log(response);
       $scope.genres = response.genres;
  })

  $scope.moviesByGenreId = {};

  $scope.fetchTitles = function (genreId) {
    console.log(genreId);
      $http.get('http://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=9d0dd3bf6b5d957142fe31486e1c2c94&page_size=1')
      .success(function (response) {
        console.log(response);
        $scope.moviesByGenreId[genreId] = response.results;
      });
  }

  $scope.fetchMovieInfo = function (id) {
      $http.get('http://api.themoviedb.org/3/movie/' + id + '?api_key=9d0dd3bf6b5d957142fe31486e1c2c94')
      .success(function (response) {
        console.log(response);
        $scope.overview = response.overview;
        $scope.poster = 'http://image.tmdb.org/t/p/w500/' + response.poster_path + '?api_key=9d0dd3bf6b5d957142fe31486e1c2c94';
    });
  }

  $scope.modalShown = false;
  $scope.toggleModal = function () {
    $scope.modalShown = !$scope.modalShown;
  }

}]);