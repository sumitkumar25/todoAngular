/**
 * Created by sukumar on 7/19/2017.
 */
angular.module('todoAngular')
    .directive('escAbort', [function () {
        return function (scope, elem, attr) {
            elem.bind('keydown', function (event) {
                if (event.keyCode === 27) {
                    scope.$apply(attr.escAbort);
                }
            });
            scope.$on('$destroy', function () {
                elem.unbind('keydown');
            })
        }
    }])
    .directive('editFocus', function ($timeout) {
        return function (scope, elem, attr) {
            scope.$watch(attr.editFocus, function (newValue) {
                $timeout(function () {
                    elem[0].focus();
                }, 0);
            });
        }
    })

