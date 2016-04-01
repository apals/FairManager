'use strict';

var app = require('../../../server');
import request from 'supertest';
import User from '../user/user.model';

var newContacts;

describe('Contacts API:', function() {
  var token, user;

  // Clear users before testing
  before(function() {
    return User.removeAsync().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'admin@example.com',
        password: 'admin',
        role: 'owner'
      });

      return user.saveAsync();
    });
  });

  before(function (done) {
    console.log('authing');
    request(app)
      .post('/auth/local')
      .send({
        email: 'admin@example.com',
        password: 'admin'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  describe('GET /api/contacts', function() {
    var contactss;

    beforeEach(function(done) {
      request(app)
        .get('/api/contacts')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contactss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      contactss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/contacts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/contacts')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'New Contacts',
          title: 'This is the brand new contacts!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newContacts = res.body;
          done();
        });
    });

    it('should respond with the newly created contacts', function() {
      newContacts.name.should.equal('New Contacts');
      newContacts.title.should.equal('This is the brand new contacts!!!');
    });

  });

  describe('GET /api/contacts/:id', function() {
    var contacts;

    beforeEach(function(done) {
      request(app)
        .get('/api/contacts/' + newContacts._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contacts = res.body;
          done();
        });
    });

    afterEach(function() {
      contacts = {};
    });

    it('should respond with the requested contacts', function() {
      contacts.name.should.equal('New Contacts');
      contacts.title.should.equal('This is the brand new contacts!!!');
    });

  });

  describe('PUT /api/contacts/:id', function() {
    var updatedContacts;

    beforeEach(function(done) {
      request(app)
        .put('/api/contacts/' + newContacts._id)
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'Updated Contacts',
          title: 'This is the updated contacts!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedContacts = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedContacts = {};
    });

    it('should respond with the updated contacts', function() {
      updatedContacts.name.should.equal('Updated Contacts');
      updatedContacts.title.should.equal('This is the updated contacts!!!');
    });

  });

  describe('DELETE /api/contacts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/contacts/' + newContacts._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when contacts does not exist', function(done) {
      request(app)
        .delete('/api/contacts/' + newContacts._id)
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
