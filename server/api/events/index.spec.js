'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var eventsCtrlStub = {
  index: 'eventsCtrl.index',
  show: 'eventsCtrl.show',
  create: 'eventsCtrl.create',
  update: 'eventsCtrl.update',
  destroy: 'eventsCtrl.destroy'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var eventsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './events.controller': eventsCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Events API Router:', function() {

  it('should return an express router instance', function() {
    eventsIndex.should.equal(routerStub);
  });

  describe('GET /api/events', function() {

    it('should route to events.controller.index', function() {
      routerStub.get
        .withArgs('/', 'eventsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/events/:id', function() {

    it('should route to events.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'eventsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/events', function() {

    it('should route to events.controller.create', function() {
      routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'eventsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/events/:id', function() {

    it('should route to events.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'eventsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/events/:id', function() {

    it('should route to events.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'authService.hasRole.admin', 'eventsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/events/:id', function() {

    it('should route to events.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'eventsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
