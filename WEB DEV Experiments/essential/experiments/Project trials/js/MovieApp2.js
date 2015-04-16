var app = angular.module("MovieApp", []);
app.controller("MovieController", function ($scope, $http) {
    $scope.hello = "Hello from the controller";
    function myapifilms(response)
    {

    }
    $scope.searchMovies = function (response) {
        var title = $scope.searchByTitle;
        $http.jsonp("http://www.myapifilms.com/imdb?title="+title+"&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=1&forceYear=0&lang=en-us&actors=F&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=1&moviePhotos=N&movieVideos=N&callback=JSON_CALLBACK")
    .success(function (response) {
        $scope.movies = response;
    });

    };
    
    var movie = [
        { title: "Avatar", year: "2009", rating: "Sci-Fiction", plot: "Blue guy in the war" },
        { title: "Om", year: "1994", rating: "Action", plot: "Shiv Raj Kumar in the lead" },
        { title: "Shabdavedi", year: "2000", rating: "Thriller", plot: "Raj Kumar in the lead" },
        { title: "Akasmika", year: "1992", rating: "Romance", plot: "Raj Kumar in the lead" },
    ];
    $scope.movies = movie;
    $scope.removeMovie = function (movie) {
        var index = $scope.movies.indexOf(movie);
        $scope.movies.splice(index, 1);
    }
    $scope.addMovie = function () {
        var newMovie = {
            title: $scope.movie.title,
            year: $scope.movie.year,
            actor: $scope.movie.rating,
            plot: $scope.movie.plot
        };
        $scope.movies.push(newMovie);
    }
    $scope.updateMovie = function () {
        alert("updated");

    }
    $scope.select = function (movie) {
        $scope.movie = movie;
    }
});