'use strict';

describe('Controller: NewPersonnelCtrl', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var NewPersonnelCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewPersonnelCtrl = $controller('NewPersonnelCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
