'use strict';

describe('Service: PersonnelService', function () {

  // load the service's module
  beforeEach(module('fairManagerApp'));

  // instantiate service
  var PersonnelService;
  beforeEach(inject(function (_PersonnelService_) {
    PersonnelService = _PersonnelService_;
  }));

  it('should do something', function () {
    expect(!!PersonnelService).toBe(true);
  });

});
