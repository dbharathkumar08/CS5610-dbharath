

app.controller('HomeCtrl', function ($scope, $http,$modal, $rootScope, $routeParams) {

 

    $scope.searchMovies = function () {
        var movie = document.getElementById('searchByTitle').value;
        $scope.movie = movie;

    }
   


});
