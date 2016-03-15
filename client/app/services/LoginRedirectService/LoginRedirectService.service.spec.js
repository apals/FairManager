'use strict';

describe('Service: LoginRedirectService', function () {

  // load the service's module
  beforeEach(module('fairManagerApp'));

  // instantiate service
  var LoginRedirectService;
  beforeEach(inject(function (_LoginRedirectService_) {
    LoginRedirectService = _LoginRedirectService_;
  }));

  it('should do something', function () {
    expect(!!LoginRedirectService).toBe(true);
  });

});
