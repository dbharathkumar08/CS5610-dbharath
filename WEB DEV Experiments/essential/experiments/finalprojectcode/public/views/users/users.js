

    app.controller('usersCtrl', function ($scope, $http, $rootScope, $routeParams,$location) {
    
    
        $(function () {
            //var currentuser = $rootScope.currentUser;
            $http.get('/allusers')
            .success(function (response) {
                $scope.users = response;
            });

    })




   
   
   

    $scope.usercommunicate = function (currentUser, user, msg)
    {

    }

});