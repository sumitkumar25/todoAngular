/**
 * Created by sukumar on 7/23/2017.
 */
describe("TodoController", function () {
    //module function provide us with ng-mocks
    /*    ng-mocks:
     1.inject and mock AngularJS services.
     2.extend other modules so they are synchronous.
     Having tests synchronous keeps them much cleaner and easier to work with.
     3.mock XHR requests in tests, and return sample data*/
    beforeEach(module('todoAngular'));
    var $controller;
    beforeEach(inject(function ($controller) {
        $controller = $controller;
    }));
});