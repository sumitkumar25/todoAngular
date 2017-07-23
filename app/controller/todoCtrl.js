/**
 * Created by sukumar on 7/16/2017.
 */
angular.module('todoAngular')
    .controller('todoCtrl', ['$scope', 'appStore', 'statusFilter',
        function ($scope, store, statusFilter) {
            var lists = $scope.lists = store.lists;
            $scope.editingList = "";
            $scope.editingTodo = "";
            $scope.nativeList = "";
            $scope.nativeTodo = "";
            $scope.filterState='all'
            $scope.addNewList = function (name) {
                store.addList(name).then(function () {
                    document.querySelector('#newList').value = "";
                });
            }
            $scope.deleteList = function (id) {
                store.deleteList(id);
            }
            $scope.update = function (key, newListName) {
                store.updateList({id: key, name: newListName});
                $scope.editingList = '';
            }
            $scope.editList = function (list) {
                $scope.nativeList = angular.copy(list);
                $scope.editingList = list;
            }
            $scope.revertListEditing = function (key) {
                $scope.editingList = "";
                $scope.lists[key] = $scope.nativeList;
            }

            $scope.addNewTodo = function (newTodo, key) {
                store.addNewTodo(newTodo, key);
            }
            $scope.deleteTodo = function (todoKey, listKey) {
                store.deleteTodo(todoKey, listKey);
            }
            $scope.editTodo = function (todo) {
                $scope.nativeTodo = angular.copy(todo)
                $scope.editingTodo = todo;
            }
            $scope.updateTodo = function (todo, todoKey, listKey) {
                store.updateTodo(todo, todoKey, listKey);
            }
            $scope.revertTodoEditing = function (todoKey, key) {
                $scope.editingTodo = "";
                $scope.lists[key].todo[todoKey] = $scope.nativeTodo;
            }

        }])