'use strict';

var app = require('../../../server');
import request from 'supertest';

var newContacts;

describe('Contacts API:', function() {

  describe('GET /api/contacts', function() {
    var contactss;

    beforeEach(function(done) {
      request(app)
        .get('/api/contacts')
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
        .send({
          name: 'New Contacts',
          info: 'This is the brand new contacts!!!'
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
      newContacts.info.should.equal('This is the brand new contacts!!!');
    });

  });

  describe('GET /api/contacts/:id', function() {
    var contacts;

    beforeEach(function(done) {
      request(app)
        .get('/api/contacts/' + newContacts._id)
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
      contacts.info.should.equal('This is the brand new contacts!!!');
    });

  });

  describe('PUT /api/contacts/:id', function() {
    var updatedContacts;

    beforeEach(function(done) {
      request(app)
        .put('/api/contacts/' + newContacts._id)
        .send({
          name: 'Updated Contacts',
          info: 'This is the updated contacts!!!'
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
      updatedContacts.info.should.equal('This is the updated contacts!!!');
    });

  });

  describe('DELETE /api/contacts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/contacts/' + newContacts._id)
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
