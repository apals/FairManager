'use strict';

describe('Controller: PersonnelDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var PersonnelDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonnelDetailCtrl = $controller('PersonnelDetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
