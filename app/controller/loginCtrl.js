/**
 * Created by sukumar on 8/9/2017.
 */
angular.module('login', ['ngRoute', 'dbConstants', 'ui.bootstrap'])
    .controller('loginCtrl', ['$scope', '$firebaseAuth', 'loginService', '$location',
        function ($scope, $firebaseAuth, loginService, $location, $firebaseObject) {
            $scope.error = ''
            $scope.login = function (user) {
                loginService.loginWithEmailAndPassword(user.name, user.password)
                    .then(function (user) {
                        console.log(user);
                        $location.path('/todo');
                    }).catch(function (e) {
                    $scope.error = e;
                })
            };
            $scope.logout = function () {
                loginService.logout();
            };
            $scope.create = function (user) {
                loginService.createUserWithEmailAndPassword(user.name, user.password)
                    .then(function (data) {
                        return loginService.addNewUserInDatabase(data.uid, user.displayName);
                    })
                    .then(function (data) {
                        console.log("data create for new user" + data);
                        $location.path('/todo');
                    })
                    .catch(function (e) {
                        $scope.error = e;
                    })
            };
        }])