'use strict';

// Declare app level module which depends on views, and components
angular.module('todoAngular', [
    'ngRoute',
    'firebase'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    var routeConfig = {
        templateUrl: '/template/todo.html',
        controller: 'todoCtrl'
    }
    $routeProvider.when('/', routeConfig)
        .otherwise({redirectTo: '/'});
}]);
