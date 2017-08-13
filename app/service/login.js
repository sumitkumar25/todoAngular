/**
 * Created by sukumar on 8/12/2017.
 */
angular.module('login')
    .factory('loginService', ['$firebaseAuth', '$q', '$firebaseObject', 'TB_USER', '$location',
        function ($firebaseAuth, $q, $firebaseObject, TB_USER, $location) {
            var user = '';
            var uid = '';
            var auth = $firebaseAuth();
            var userList = $firebaseObject(firebase.database().ref('/' + TB_USER));
            var User = function (displayName) {
                this.displayName = displayName;
            };
            var login = {
                loginWithEmailAndPassword: function (email, pass) {
                    var def = $q.defer();
                    auth.$signInWithEmailAndPassword(email, pass)
                        .then(function (userData) {
                            user = userData;
                            uid = userData.uid;
                            def.resolve(user);
                        }).catch(function (e) {
                        def.reject(e);
                    });
                    return def.promise;
                },
                createUserWithEmailAndPassword: function (email, pass) {
                    var def = $q.defer();
                    auth.$createUserWithEmailAndPassword(email, pass)
                        .then(function (userData) {
                            user = userData;
                            def.resolve(userData);
                        })
                        .catch(function (e) {
                            def.reject(e);
                        });
                    return def.promise;
                },
                addNewUserInDatabase: function (userId, displayName) {
                    userList[userId] = new User(displayName);
                    return userList.$save();
                },
                logout: function () {
                    auth.$signOut().then(function () {
                        $location.path('/login');
                    })
                },
                getUser: function () {
                    var def = $q.defer();
                    if (user) {
                        def.resolve(user);
                    } else {
                        def.reject(user);
                    }
                    return def.promise;
                },
                getUid: function () {
                    return uid;
                }

            }
            return login
        }])