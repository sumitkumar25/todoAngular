/**
 * Created by sukumar on 7/22/2017.
 */
angular.module('todoAngular')
    .filter("status", function () {
        return function (todos, state) {
            if (state == 'all') {
                return todos;
            }
            var filtered = [];
            angular.forEach(todos, function (todo) {
                if (state == 'complete' && todo.complete) {
                    filtered.push(todo);
                }
                else if (state == 'inComplete' && !todo.complete) {
                    filtered.push(todo);
                }
            })
            return filtered
        }
    })