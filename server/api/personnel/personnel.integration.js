'use strict';

var app = require('../../../server');
import request from 'supertest';
import User from '../user/user.model';

var newPersonnel;

describe('Personnel API:', function() {

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

  describe('GET /api/personnel', function() {
    var personnels;

    beforeEach(function(done) {
      request(app)
        .get('/api/personnel')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          personnels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      personnels.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/personnel', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/personnel')
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'New Personnel',
          title: 'This is the brand new personnel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPersonnel = res.body;
          done();
        });
    });

    it('should respond with the newly created personnel', function() {
      newPersonnel.name.should.equal('New Personnel');
      newPersonnel.title.should.equal('This is the brand new personnel!!!');
    });

  });

  describe('GET /api/personnel/:id', function() {
    var personnel;

    beforeEach(function(done) {
      request(app)
        .get('/api/personnel/' + newPersonnel._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          personnel = res.body;
          done();
        });
    });

    afterEach(function() {
      personnel = {};
    });

    it('should respond with the requested personnel', function() {
      personnel.name.should.equal('New Personnel');
      personnel.title.should.equal('This is the brand new personnel!!!');
    });

  });

  describe('PUT /api/personnel/:id', function() {
    var updatedPersonnel;

    beforeEach(function(done) {
      request(app)
        .put('/api/personnel/' + newPersonnel._id)
        .set('authorization', 'Bearer ' + token)
        .send({
          name: 'Updated Personnel',
          title: 'This is the updated personnel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPersonnel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPersonnel = {};
    });

    it('should respond with the updated personnel', function() {
      updatedPersonnel.name.should.equal('Updated Personnel');
      updatedPersonnel.title.should.equal('This is the updated personnel!!!');
    });

  });

  describe('DELETE /api/personnel/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/personnel/' + newPersonnel._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when personnel does not exist', function(done) {
      request(app)
        .delete('/api/personnel/' + newPersonnel._id)
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
