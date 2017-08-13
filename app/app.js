'use strict';

// Declare app level module which depends on views, and components
angular.module('todoAngular', [
        'ngRoute',
        'firebase',
        'login',
        'dbConstants'
    ])
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function (scope, current, pre) {
            console.log(scope, current, pre);
        });
        $rootScope.$on('$routeChangeError', function (event, current, previous, reject) {
            console.log(event + " \n" + current + " \n" + previous + " \n" + reject);
            $location.path('/login');
        })
    }])
    .config(['$locationProvider', '$routeProvider',
        function ($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            var todoConfig = {
                templateUrl: '/template/todo.html',
                controller: 'todoCtrl',
                resolve: {
                    user: function (loginService) {
                        return loginService.getUser()
                    }
                }
            }
            var loginConfig = {
                templateUrl: '/template/login.html',
                controller: 'loginCtrl'
            }
            $routeProvider.when('/', loginConfig)
                .when('/login', loginConfig)
                .when('/todo', todoConfig)
                .otherwise({redirectTo: '/login'});
        }]);
