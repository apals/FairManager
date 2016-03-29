'use strict';

describe('Service: ErrorHandlingService', function () {

  // load the service's module
  beforeEach(module('fairManagerApp'));

  // instantiate service
  var ErrorHandlingService;
  beforeEach(inject(function (_ErrorHandlingService_) {
    ErrorHandlingService = _ErrorHandlingService_;
  }));

  it('should do something', function () {
    expect(!!ErrorHandlingService).toBe(true);
  });

});

