'use strict';

var app = require('../../../server');
import request from 'supertest';
import User from '../user/user.model';

var newPartners;

describe('Partners API:', function() {

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

  describe('GET /api/partners', function() {
    var partnerss;

    beforeEach(function(done) {
      request(app)
        .get('/api/partners')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          partnerss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      partnerss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/partners', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/partners')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'New Partners',
          websiteUrl: 'This is the brand new partners!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPartners = res.body;
          done();
        });
    });

    it('should respond with the newly created partners', function() {
      newPartners.name.should.equal('New Partners');
      newPartners.websiteUrl.should.equal('This is the brand new partners!!!');
    });

  });

  describe('GET /api/partners/:id', function() {
    var partners;

    beforeEach(function(done) {
      request(app)
        .get('/api/partners/' + newPartners._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          partners = res.body;
          done();
        });
    });

    afterEach(function() {
      partners = {};
    });

    it('should respond with the requested partners', function() {
      partners.name.should.equal('New Partners');
      partners.websiteUrl.should.equal('This is the brand new partners!!!');
    });

  });

  describe('PUT /api/partners/:id', function() {
    var updatedPartners;

    beforeEach(function(done) {
      request(app)
        .put('/api/partners/' + newPartners._id)
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'Updated Partners',
          websiteUrl: 'This is the updated partners!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPartners = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPartners = {};
    });

    it('should respond with the updated partners', function() {
      updatedPartners.name.should.equal('Updated Partners');
      updatedPartners.websiteUrl.should.equal('This is the updated partners!!!');
    });

  });

  describe('DELETE /api/partners/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/partners/' + newPartners._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when partners does not exist', function(done) {
      request(app)
        .delete('/api/partners/' + newPartners._id)
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
