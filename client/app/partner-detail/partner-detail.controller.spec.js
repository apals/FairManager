'use strict';

describe('Controller: PartnerDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var PartnerDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PartnerDetailCtrl = $controller('PartnerDetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
