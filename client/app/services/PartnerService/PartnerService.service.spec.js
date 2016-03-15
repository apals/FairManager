'use strict';

describe('Service: PartnerService', function () {

  // load the service's module
  beforeEach(module('fairManagerApp'));

  // instantiate service
  var PartnerService;
  beforeEach(inject(function (_PartnerService_) {
    PartnerService = _PartnerService_;
  }));

  it('should do something', function () {
    expect(!!PartnerService).toBe(true);
  });

});
