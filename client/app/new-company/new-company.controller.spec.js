'use strict';

describe('Controller: NewCompanyCtrl', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var NewCompanyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewCompanyCtrl = $controller('NewCompanyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
