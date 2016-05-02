//Get existing app
var app = angular.module("todo-main");

//CONTROLLER 2 DISPLAY MODULE
app.controller('todo-display', function ($scope, $http) {
    //Get data for user
    $scope.ToDo = new Array();

    $http.get('/api/ToDo').then(function successCallback(response) {
        $scope.ToDo = response.data;
    }, function errorCallback(response) {

    });

    $scope.Edit = function (_id) {
        var x = _id;
        $scope.ToDo.forEach(function (ToDo) {
            if (ToDo._id == _id) {
                $scope.$emit('handleEmit', { ToDo: ToDo });
                return;
            }
        });
    };
    $scope.Delete = function (_id) {

        $scope.result = $http({
            method: 'DELETE',
            url: '/api/ToDo',
            data: { "ID": _id },
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).then(function successCallback(response) {
            //Reload page - Can't be arsed with dynamic refresh
            location.reload();
        }, function errorCallback(response) {
            //Display error
        });
    };
});