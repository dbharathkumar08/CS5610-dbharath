
var app = angular.module("PassportApp", ["ngRoute", "ui.bootstrap"]);

app.config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/home', {
          templateUrl: 'views/home/home.html',
          controller: 'HomeCtrl'
         
      })
      .when('/profile', {
          templateUrl: 'views/profile/profile.html',
          controller: 'ProfileCtrl',
          resolve: {
              loggedin: checkLoggedin
          }
      })
         .when('/edit_profile', {
             templateUrl: 'views/edit_profile/edit_profile.html',
             controller: 'edit_profileCtrl',
             resolve: {
                 loggedin: checkLoggedin
             }
         })
      .when('/login', {
          templateUrl: 'views/login/login.html',
          controller: 'LoginCtrl'
      })
        .when('/movie_details', {
            templateUrl: 'views/movie_details/movie_details.html',
            controller: 'movie_detailsCtrl'
            
        })
        .when('/movie_description/:title', {
            templateUrl: 'views/movie_description/movie_description.html',
            controller: 'movie_descriptionCtrl'
           
        })
        .when('/users', {
            templateUrl: 'views/users/users.html',
            controller: 'usersCtrl'
           
        })
  .when('/trial', {
      templateUrl: 'views/trial/trial.html',
      controller: 'trialCtrl'

  })
         .when('/movie_details/:idIMDB', {
             templateUrl: 'views/movie_details/movie_details.html',
             controller: 'movie_detailsCtrl'
            
           
         })
    
        .when('/other_profile_details/:username', {
            templateUrl: 'views/other_profile_details/other_profile_details.html',
            controller: 'other_profile_detailsCtrl'
           

        })

        
      .when('/register', {
          templateUrl: 'views/register/register.html',
          controller: 'RegisterCtrl'
      })
        .when('/about', {
            templateUrl: 'views/Information/About.html'
           


        })
        .when('/contact', {
            templateUrl: 'views/Information/Contact.html'
           


        })
      .otherwise({
          redirectTo: '/home'
      });
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
        {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        // User is Not Authenticated
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });
    
    return deferred.promise;
};

app.controller("NavCtrl", function ($scope, $http, $modal,$location, $rootScope) {





    $scope.logout = function () {
        $http.post("/logout")
        .success(function(){
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    };


});



