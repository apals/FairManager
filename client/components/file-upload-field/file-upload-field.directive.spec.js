'use strict';

describe('Directive: fileUploadField', function () {

  // load the directive's module
  beforeEach(module('fairManagerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<file-upload-field></file-upload-field>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
