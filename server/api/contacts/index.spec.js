'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var contactsCtrlStub = {
  index: 'contactsCtrl.index',
  show: 'contactsCtrl.show',
  create: 'contactsCtrl.create',
  update: 'contactsCtrl.update',
  destroy: 'contactsCtrl.destroy'
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
var contactsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './contacts.controller': contactsCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Contacts API Router:', function() {

  it('should return an express router instance', function() {
    contactsIndex.should.equal(routerStub);
  });

  describe('GET /api/contacts', function() {

    it('should route to contacts.controller.index', function() {
      routerStub.get
        .withArgs('/', 'contactsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/contacts/:id', function() {

    it('should route to contacts.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'contactsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/contacts', function() {

    it('should route to contacts.controller.create', function() {
      routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'contactsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/contacts/:id', function() {

    it('should route to contacts.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'contactsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/contacts/:id', function() {

    it('should route to contacts.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'authService.hasRole.admin', 'contactsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/contacts/:id', function() {

    it('should route to contacts.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'contactsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
