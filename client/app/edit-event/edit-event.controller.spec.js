'use strict';

describe('Controller: EditEventCtrl', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var EditEventCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditEventCtrl = $controller('EditEventCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
