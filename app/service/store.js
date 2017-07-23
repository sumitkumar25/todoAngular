angular.module("todoAngular")
    .constant('STORE_URL', '/data/store.json')
    .constant('DATE_DELIMITER', '/')
    .service("appStore", ['$http', 'STORE_URL', 'DATE_DELIMITER', '$window', '$q',
        function ($http, STORE_URL, DATE_DELIMITER, $window, $q) {
            var db = "TODO_LISTS"
            var store = {
                lists: {},
                _addToLocalStorage: function (data) {
                    $window.localStorage[db] = JSON.stringify(data);
                },
                _getFromLocalStorage: function () {
                    return JSON.parse($window.localStorage[db] || '{}');
                },
                _newList: function (name, date) {
                    this.name = name;
                    this.date = date;
                    this.todo = {};
                },
                _getDateAndId: function () {
                    var date = new Date();
                    var res = {};
                    res.id = date.getTime();
                    res.date = date.getDay() + DATE_DELIMITER + date.getMonth() + DATE_DELIMITER + date.getFullYear();
                    return res;
                },
                addList: function (name) {
                    var deferred = $q.defer();
                    var dateObj = store._getDateAndId();
                    var newList = new store._newList(name, dateObj.date);
                    store.lists[dateObj.id] = newList;
                    store._addToLocalStorage(store.lists);
                    deferred.resolve(store.lists);
                    return deferred.promise;
                },
                deleteList: function (list_id) {
                    var deferred = $q.defer();
                    delete store.lists[list_id];
                    store._addToLocalStorage(store.lists);
                    deferred.resolve(store.lists);
                    return deferred.promise;
                },
                updateList: function (list_Obj) {
                    var deferred = $q.defer();
                    store.lists[list_Obj.id].name = list_Obj.name ? list_Obj.name : store.lists[list_Obj.id].name;
                    store.lists[list_Obj.id].date = store._getDateAndId().date;
                    store._addToLocalStorage(store.lists);
                    deferred.resolve(store.lists);
                    return deferred.promise;
                },
                addNewTodo: function (newTodo, todokey) {
                    var deferred = $q.defer();
                    newTodo = newTodo.trim();
                    if (newTodo.length) {
                        store.lists[todokey].todo[store._getDateAndId().id] = {title: newTodo, complete: false};
                        store._addToLocalStorage(store.lists);
                        deferred.resolve(store.lists);
                    } else {
                        deferred.reject("todo addition failed")
                    }
                    return deferred.promise;
                },
                deleteTodo: function (todoKey, listKey) {
                    var deferred = $q.defer();
                    delete store.lists[listKey].todo[todoKey];
                    store._addToLocalStorage(store.lists);
                    deferred.resolve(store.lists);
                    return deferred.promise;
                },
                updateTodo: function (todo, todoKey, listKey) {
                    var deferred = $q.defer();
                    store.lists[listKey].todo[todoKey] = todo;
                    store._addToLocalStorage(store.lists);
                    deferred.resolve(store.lists);
                    return deferred.promise;
                }
            }
            angular.copy(store._getFromLocalStorage(), store.lists);
            return store;
        }
    ])