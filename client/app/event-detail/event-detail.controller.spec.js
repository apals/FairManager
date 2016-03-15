'use strict';

describe('Controller: EventDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var EventDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventDetailCtrl = $controller('EventDetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
