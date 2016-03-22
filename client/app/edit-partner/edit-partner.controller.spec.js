'use strict';

describe('Component: EditPartnerComponent', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));

  var EditPartnerComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    EditPartnerComponent = $componentController('EditPartnerComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
