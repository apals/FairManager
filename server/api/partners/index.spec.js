'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var partnersCtrlStub = {
  index: 'partnersCtrl.index',
  show: 'partnersCtrl.show',
  create: 'partnersCtrl.create',
  update: 'partnersCtrl.update',
  destroy: 'partnersCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var partnersIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './partners.controller': partnersCtrlStub
});

describe('Partners API Router:', function() {

  it('should return an express router instance', function() {
    partnersIndex.should.equal(routerStub);
  });

  describe('GET /api/partners', function() {

    it('should route to partners.controller.index', function() {
      routerStub.get
        .withArgs('/', 'partnersCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/partners/:id', function() {

    it('should route to partners.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'partnersCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/partners', function() {

    it('should route to partners.controller.create', function() {
      routerStub.post
        .withArgs('/', 'partnersCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/partners/:id', function() {

    it('should route to partners.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'partnersCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/partners/:id', function() {

    it('should route to partners.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'partnersCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/partners/:id', function() {

    it('should route to partners.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'partnersCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
