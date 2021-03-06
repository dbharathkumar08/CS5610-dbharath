﻿var app = angular.module("CourseApp", ["ngRoute"]);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'profileManager/home.html'
        }).
       
       when('/profile', {
           templateUrl: 'profileManager/profile_edit.html',
           controller: 'ProfileController'
       }).
        otherwise({
            redirectTo: '/home'
        });
  }]);

app.controller("loginController", function ($scope, loginService, $location) {
    $scope.currentUser = null;
    $scope.color = "btn btn-success";
    $scope.clear = function () {
        $scope.user.username = '';

    }
    $scope.psclear = function () {
        $scope.user.password = '';
    }
    $scope.login = function () {

        loginService.login($scope.user, callback);

    }
    function callback() {
        $scope.currentUser = loginService.getCurrentUser();

        if ($scope.currentUser)
            $scope.color = "btn btn-success";
        else
            $scope.color = "btn btn-danger";
    }
    $scope.logout = function () {

        $scope.currentUser = null;
        $scope.user.username = null;
        $scope.user.password = null;
        var res = loginService.logout();
        $location.path('courseApp/home.html');
    }

});

app.factory("loginService", function ($http) {
    var currentUser = null;

    var login = function (user, callback) {

        $http.post('/login', user)
        .success(function (response) {
            currentUser = response;
            callback();
        });
    }

    var updateCurrentUser = function (password, email, firstName, lastName) {

        currentUser.password = password;
        currentUser.email = email;
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;

        $http.post('/update', currentUser)
        .success(function (response) {
            currentUser = response;
        });
    }
    var getCurrentUser = function () {
        return currentUser;
    }

    var logout = function () {
        currentUser = null;
    }

    return {
        login: login,
        getCurrentUser: getCurrentUser,
        logout: logout,
        updateCurrentUser: updateCurrentUser
    }
});

app.controller("ProfileController", function ($scope, loginService, $routeParams) {
    var username = $routeParams.username;
    $scope.username = username;
    var currentUser = loginService.getCurrentUser();

    $scope.user.new_fn = currentUser.firstName;
    $scope.user.new_ln = currentUser.lastName;
    $scope.user.new_mail = currentUser.email;
    $scope.user.new_pwd = currentUser.password;
    $scope.user.re_pwd = currentUser.password;

    $scope.mismatch = false;
    $scope.save = false;

    $scope.saveChanges = function () {
        var password = $scope.user.new_pwd;
        var repassword = $scope.user.re_pwd;
        var email = $scope.user.new_mail;
        var firstName = $scope.user.new_fn;
        var lastName = $scope.user.new_ln;

        if (password != repassword) {
            $scope.mismatch = true;
            $scope.save = false;
        } else {
            $scope.mismatch = false;
            $scope.save = true;
            loginService.updateCurrentUser(password, email, firstName, lastName);
        }
    }
});