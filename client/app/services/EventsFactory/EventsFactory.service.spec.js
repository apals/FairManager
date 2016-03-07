'use strict';

describe('Service: EventsFactory', function () {

  // load the service's module
  beforeEach(module('fairManagerApp'));

  // instantiate service
  var EventsFactory;
  beforeEach(inject(function (_EventsFactory_) {
    EventsFactory = _EventsFactory_;
  }));

  it('should do something', function () {
    expect(!!EventsFactory).toBe(true);
  });

});
