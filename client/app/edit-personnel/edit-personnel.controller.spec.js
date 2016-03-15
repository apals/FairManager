'use strict';

describe('Controller: EditPersonnelCtrl', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var EditPersonnelCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditPersonnelCtrl = $controller('EditPersonnelCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
