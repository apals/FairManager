'use strict';

describe('Service: Companies', function () {

  // load the service's module
  beforeEach(module('fairManagerApp'));

  // instantiate service
  var Companies;
  beforeEach(inject(function (_Companies_) {
    Companies = _Companies_;
  }));

  it('should do something', function () {
    expect(!!Companies).toBe(true);
  });

});
