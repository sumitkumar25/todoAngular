'use strict';

// Declare app level module which depends on views, and components
angular.module('todoAngular', [
    'ngRoute',
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    var routeConfig = {
        templateUrl: 'todomvc-index.html',
        controller: 'todoCtrl'
    }
    $routeProvider.when('/todoAngular', routeConfig)
        .when('/complete', routeConfig)
        .when('/all', routeConfig)
        .when('/pending', routeConfig)
        .otherwise({redirectTo: '/todoAngular'});
}]);
