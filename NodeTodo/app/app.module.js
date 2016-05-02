var app = angular.module("todo-main", []);

//SERVICE
app.run(function ($rootScope) {
    /*
        Receive emitted message and broadcast it.
        Event names must be distinct or browser will blow up!
    */
    $rootScope.$on('handleEmit', function (event, args) {
        $rootScope.$broadcast('handleBroadcast', args);
    });
});