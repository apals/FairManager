'use strict';

describe('Directive: detail-view', function () {

  // load the directive's module
  beforeEach(module('fairManagerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<detail-view></detail-view>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the detail-view directive');
  }));
});
