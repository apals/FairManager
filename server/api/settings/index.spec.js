'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var settingsCtrlStub = {
  index: 'settingsCtrl.index',
  show: 'settingsCtrl.show',
  create: 'settingsCtrl.create',
  update: 'settingsCtrl.update',
  destroy: 'settingsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var settingsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './settings.controller': settingsCtrlStub
});

describe('Settings API Router:', function() {

  it('should return an express router instance', function() {
    settingsIndex.should.equal(routerStub);
  });

});
