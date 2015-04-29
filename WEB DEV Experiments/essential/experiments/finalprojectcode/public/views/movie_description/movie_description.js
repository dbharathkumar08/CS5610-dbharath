

app.controller('movie_descriptionCtrl', function ($scope, $http, $rootScope, $log, $routeParams) {

    
      $(function () {
  
          $scope.currentPageMovie = 1;
          $scope.currentPagePeople = 1;
          $scope.itemsPerPageMovie = 5;
          $scope.itemsPerPagePeople = 5;
  
          var title = $routeParams.title;
          $http.jsonp("http://www.myapifilms.com/imdb?title=" + title + "&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=10&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&callback=JSON_CALLBACK")
           
          .success(function (response) {
              console.log(response);
              $scope.movies = response;
           /*  // $scope.totalMovieItems = $scope.movieResults.length;
             // console.log($scope.totalMovieItems);
              //for pagination
              console.log("before pagination");
              $scope.$watch('currentPageMovie + itemsPerPageMovie', function () {
                  console.log("inside watch");
                  var begin = (($scope.currentPageMovie - 1) * $scope.itemsPerPageMovie),
                    end = begin + $scope.itemsPerPageMovie;
                  console.log("watch end");
                  $scope.filteredMovieResults = $scope.movieResults.slice(begin, end);
                  console.log($scope.filteredMovieResults);
              });
              $scope.pageChanged = function () {
              }; */
          });
      })
  
          
  });
  
  /*

    app.controller('movie_descriptionCtrl', function ($scope, $http, $rootScope, $log,$routeParams) {


    $(function () {
        $scope.totalItems = 64;
        $scope.currentPage = 4;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            $log.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
    })
}); 
// .success(function (response) {
//    $scope.movies = response;
// })
    
*/


        

//  var searchForSummary = function (searchTerm) {
//  tmdbAPIService.searchForSummary(searchTerm,