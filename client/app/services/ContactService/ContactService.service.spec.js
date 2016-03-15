'use strict';

describe('Service: ContactService', function () {

  // load the service's module
  beforeEach(module('fairManagerApp'));

  // instantiate service
  var ContactService;
  beforeEach(inject(function (_ContactService_) {
    ContactService = _ContactService_;
  }));

  it('should do something', function () {
    expect(!!ContactService).toBe(true);
  });

});
