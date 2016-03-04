'use strict';

describe('Controller: PersonnelCtrl', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var PersonnelCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonnelCtrl = $controller('PersonnelCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
