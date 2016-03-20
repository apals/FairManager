'use strict';

describe('Service: CompanyService', function () {

  // load the service's module
  beforeEach(module('fairManagerApp'));

  // instantiate service
  var Companies;
  beforeEach(inject(function (CompanyService) {
    Companies = CompanyService;
  }));

  it('should do something', function () {
    expect(!!Companies).toBe(true);
  });

});
