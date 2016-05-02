//Get existing app
var app = angular.module("todo-main");

//CONTROLLER 1 - POST MODULE
app.controller('todo-post', function ($scope, $http, $window, $filter) {

    //SetupFields
    $scope.fields = {};
    $scope.fields.Description = "Enter description...";
    $scope.fields.Date = null;
    $scope.fields.File = null;
    $scope.fields.Complete = false;
    $scope.fields.ID = "";

    $scope.fileNameChanged = function (input) {
        var reader = new FileReader();
        reader.onloadend = function () {
            //alert(reader.result);
            if (reader.result != null) { $scope.fields.ImageData = reader.result; }
        }
        reader.readAsDataURL(input.files[0]);

    }


    $scope.Posttodo = function () {
        if (!$scope.form.$valid) { return; };

        //NEEDS USER TO POST
        if (!localStorage.getItem("username")) { $window.location.href = './todo-login.html'; return; }
        var data = $scope.fields;
        data.Username = localStorage.getItem("username");

        var formattedData = JSON.stringify(data);
        if (!$scope.fields.ID) {
            $scope.result = $http.post('/api/ToDo', data).then(function successCallback(response) {
                //Reload page - Can't be arsed with dynamic refresh
                location.reload();
            }, function errorCallback(response) {
                //Display error
            });
        }
        else {
            $scope.result = $http.put('/api/ToDo', data).then(function successCallback(response) {
                //Reload page - Can't be arsed with dynamic refresh
                location.reload();
            }, function errorCallback(response) {
                //Display error
            });
        };


    };
    $scope.$on('handleBroadcast', function (event, args) {
        var ToDo = args.ToDo;
        $scope.fields.Description = ToDo.Description;
        $scope.fields.Date = new Date(ToDo.Date);
        $scope.fields.File = ToDo.File;
        $scope.fields.Complete = ToDo.Complete;
        $scope.fields.ID = ToDo._id;
    });
});