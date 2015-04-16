
var app = angular.module("MoviesApp", []);

app.controller("MovieController", function ($scope, $http) {

    var users = [
            { _id: "02134", username: "arvind", firstname: "Ramesh", lastname: "Arvind", email: "ram@gmail.com", roles: ['student']},
            { _id: "02135", username: "parvind", firstname: "Suresh", lastname: "parvind", email: "ram1@gmail.com", roles: ['student','teacher']},
            { _id: "02136", username: "manvind", firstname: "Ram", lastname: "mavind", email: "ram2@gmail.com", roles: ['student','admin'] },
            { _id: "02137", username: "rarvind", firstname: "Rahul", lastname: "rarvind", email: "ram3@gmail.com", roles: ['student'] },
            { _id: "02138", username: "farvind", firstname: "Rakesh", lastname: "farvind", email: "ram4@gmail.com", roles: ['student','government'] },
            { _id: "02139", username: "garvind", firstname: "Ratesh", lastname: "garvind", email: "ram5@gmail.com", roles: ['student'] },
            { _id: "02140", username: "darvind", firstname: "Rajesh", lastname: "darvind", email: "ram6@gmail.com", roles: ['student'] }
       
    ];
    $scope.users = users;
});