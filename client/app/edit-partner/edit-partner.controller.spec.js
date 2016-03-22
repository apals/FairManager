'use strict';

describe('Controller: EditPartnerCtrl', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var EditPartnerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditPartnerCtrl = $controller('EditPartnerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
