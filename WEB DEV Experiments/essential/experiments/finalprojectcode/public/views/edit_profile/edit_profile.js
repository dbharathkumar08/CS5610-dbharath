app.controller('edit_profileCtrl', function ($scope, $http, $rootScope, $routeParams) {

    $scope.update = function (user) {
        $http.put('/rest/user/' + user._id, user)
        .success(function (users) {
            $scope.users = users;
        });
    }
});