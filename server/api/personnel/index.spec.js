'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var personnelCtrlStub = {
  index: 'personnelCtrl.index',
  show: 'personnelCtrl.show',
  create: 'personnelCtrl.create',
  update: 'personnelCtrl.update',
  destroy: 'personnelCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var personnelIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './personnel.controller': personnelCtrlStub
});

describe('Personnel API Router:', function() {

  it('should return an express router instance', function() {
    personnelIndex.should.equal(routerStub);
  });

  describe('GET /api/personnel', function() {

    it('should route to personnel.controller.index', function() {
      routerStub.get
        .withArgs('/', 'personnelCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/personnel/:id', function() {

    it('should route to personnel.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'personnelCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/personnel', function() {

    it('should route to personnel.controller.create', function() {
      routerStub.post
        .withArgs('/', 'personnelCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/personnel/:id', function() {

    it('should route to personnel.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'personnelCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/personnel/:id', function() {

    it('should route to personnel.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'personnelCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/personnel/:id', function() {

    it('should route to personnel.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'personnelCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
