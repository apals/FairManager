'use strict';

describe('Controller: EditCompanyCtrl', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var EditCompanyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditCompanyCtrl = $controller('EditCompanyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
