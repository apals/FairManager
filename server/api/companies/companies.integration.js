'use strict';

var app = require('../../../server');
import request from 'supertest';

var newCompanies;

describe('Companies API:', function() {

  describe('GET /api/companies', function() {
    var companiess;

    beforeEach(function(done) {
      request(app)
        .get('/api/companies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          companiess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      companiess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/companies', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/companies')
        .send({
          name: 'New Companies',
          info: 'This is the brand new companies!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCompanies = res.body;
          done();
        });
    });

    it('should respond with the newly created companies', function() {
      newCompanies.name.should.equal('New Companies');
      newCompanies.info.should.equal('This is the brand new companies!!!');
    });

  });

  describe('GET /api/companies/:id', function() {
    var companies;

    beforeEach(function(done) {
      request(app)
        .get('/api/companies/' + newCompanies._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          companies = res.body;
          done();
        });
    });

    afterEach(function() {
      companies = {};
    });

    it('should respond with the requested companies', function() {
      companies.name.should.equal('New Companies');
      companies.info.should.equal('This is the brand new companies!!!');
    });

  });

  describe('PUT /api/companies/:id', function() {
    var updatedCompanies;

    beforeEach(function(done) {
      request(app)
        .put('/api/companies/' + newCompanies._id)
        .send({
          name: 'Updated Companies',
          info: 'This is the updated companies!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCompanies = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCompanies = {};
    });

    it('should respond with the updated companies', function() {
      updatedCompanies.name.should.equal('Updated Companies');
      updatedCompanies.info.should.equal('This is the updated companies!!!');
    });

  });

  describe('DELETE /api/companies/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/companies/' + newCompanies._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when companies does not exist', function(done) {
      request(app)
        .delete('/api/companies/' + newCompanies._id)
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
