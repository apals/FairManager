'use strict';

describe('Controller: NewPartnerCtrl', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var NewPartnerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewPartnerCtrl = $controller('NewPartnerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
