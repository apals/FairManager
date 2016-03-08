'use strict';

describe('Service: NavbarService', function () {

  // load the service's module
  beforeEach(module('fairManagerApp'));

  // instantiate service
  var NavbarService;
  beforeEach(inject(function (_NavbarService_) {
    NavbarService = _NavbarService_;
  }));

  it('should do something', function () {
    expect(!!NavbarService).toBe(true);
  });

});
