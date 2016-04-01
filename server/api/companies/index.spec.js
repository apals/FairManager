'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var companiesCtrlStub = {
  index: 'companiesCtrl.index',
  show: 'companiesCtrl.show',
  create: 'companiesCtrl.create',
  update: 'companiesCtrl.update',
  destroy: 'companiesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var companiesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './companies.controller': companiesCtrlStub
});

describe('Companies API Router:', function() {

  it('should return an express router instance', function() {
    companiesIndex.should.equal(routerStub);
  });

  describe('GET /api/companies', function() {

    it('should route to companies.controller.index', function() {
      routerStub.get
        .withArgs('/', 'companiesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/companies/:id', function() {

    it('should route to companies.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'companiesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/companies', function() {

    it('should route to companies.controller.create', function() {
      routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'companiesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/companies/:id', function() {

    it('should route to companies.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'companiesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/companies/:id', function() {

    it('should route to companies.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'authService.hasRole.admin', 'companiesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/companies/:id', function() {

    it('should route to companies.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'companiesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
