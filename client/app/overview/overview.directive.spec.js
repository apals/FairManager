'use strict';

describe('Directive: overview', function () {

  // load the directive's module and view
  beforeEach(module('fairManagerApp'));
  beforeEach(module('app/overview/overview.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<overview></overview>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the overview directive');
  }));
});
