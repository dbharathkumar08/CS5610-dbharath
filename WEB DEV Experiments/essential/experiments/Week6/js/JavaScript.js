﻿var app = angular.module("HelloWorldApp", []);

app.controller("HelloWorldController",
function ($scope) {

    var employee = {
        first: "Sachin",
        last: "Tendulkar"
    };

    $scope.employee = employee;

    var employees = [
        { first: "Mahendra", last: "Dev", salary: "50000", Location:"Bangalore"},
        { first: "Dinesh", last: "Rahul", salary: "60000", Location: "New Delhi" },
        { first: "Mahesh", last: "Babu", salary: "70000", Location: "Mumbai" },
        { first: "Rahul", last: "Vince", salary: "80000", Location: "Mangalore" },
    ];

    $scope.employees = employees;

    
});