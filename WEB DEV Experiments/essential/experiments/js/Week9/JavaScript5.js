var app = angular.module('APIApp', []);

app.directive('hoverBgImage', function () {
    return {
        link: function (scope, elm, attrs) {
            elm.bind('mouseenter', function () {
                this.style.backgroundImage = 'url(' + attrs.hoverBgImage + ')';
            });
            elm.bind('mouseleave', function () {
                this.style.backgroundImage = '';
            })
        }
    };
});


app.controller('APICtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('http://api.themoviedb.org/3/genre/movie/list?api_key=9f8133856d865923b1fdce653c15f5c3')
       .success(function (response) {
           $scope.genres = response.genres;
       })

    $scope.moviesByGenreId = {};
    $scope.movieInfoByGenreId = {};
    $scope.trailerKey = "";

    $scope.fetchTitles = function (genreId) {
        console.log(genreId);
        $http.get('http://api.themoviedb.org/3/genre/' + genreId + '/movies?api_key=9f8133856d865923b1fdce653c15f5c3&page_size=1')
          .success(function (response) {
              $scope.moviesByGenreId[genreId] = response.results;
              fetchPosters();
          });
    }

    var fetchPosters = function () {
        //for each genreId.arrayofmovieresults, extract posterid, form posterurl and set in postersarray
        for (var genreId in $scope.moviesByGenreId) {
            var array = $scope.moviesByGenreId[genreId];
            $scope.movieInfoByGenreId[genreId] = [];
            for (var i = 0; i < array.length; i++) {
                if (array[i].poster_path != null) {
                    var posterURL = 'http://image.tmdb.org/t/p/w500/' + array[i].poster_path + '?api_key=9f8133856d865923b1fdce653c15f5c3';
                    fetchMovieTrailer(genreId, posterURL, array[i].id);
                }
            }
        }
    }

    $scope.loadMore = function () {
        //implement ajax request for more titles
    }

    var fetchMovieTrailer = function (genreId, posterURL, movieId) {
        $http.get('http://api.themoviedb.org/3/movie/' + movieId + '/videos?api_key=9f8133856d865923b1fdce653c15f5c3')
          .success(function (response) {
              var obj = {};
              obj.posterUrl = posterURL;
              if (response.results != null && response.results.length > 0) {
                  obj.trailerKey = response.results[0].key;
              }
              $scope.movieInfoByGenreId[genreId].push(obj);
          });
    }
}]);