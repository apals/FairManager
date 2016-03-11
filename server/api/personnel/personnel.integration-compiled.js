'use strict';

var app = require('../../../server');
import request from 'supertest';

var newPersonnel;

describe('Personnel API:', function () {

  describe('GET /api/personnel', function () {
    var personnels;

    beforeEach(function (done) {
      request(app).get('/api/personnel').expect(200).expect('Content-Type', /json/).end((err, res) => {
        if (err) {
          return done(err);
        }
        personnels = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      personnels.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/personnel', function () {
    beforeEach(function (done) {
      request(app).post('/api/personnel').send({
        name: 'New Personnel',
        info: 'This is the brand new personnel!!!'
      }).expect(201).expect('Content-Type', /json/).end((err, res) => {
        if (err) {
          return done(err);
        }
        newPersonnel = res.body;
        done();
      });
    });

    it('should respond with the newly created personnel', function () {
      newPersonnel.name.should.equal('New Personnel');
      newPersonnel.info.should.equal('This is the brand new personnel!!!');
    });
  });

  describe('GET /api/personnel/:id', function () {
    var personnel;

    beforeEach(function (done) {
      request(app).get('/api/personnel/' + newPersonnel._id).expect(200).expect('Content-Type', /json/).end((err, res) => {
        if (err) {
          return done(err);
        }
        personnel = res.body;
        done();
      });
    });

    afterEach(function () {
      personnel = {};
    });

    it('should respond with the requested personnel', function () {
      personnel.name.should.equal('New Personnel');
      personnel.info.should.equal('This is the brand new personnel!!!');
    });
  });

  describe('PUT /api/personnel/:id', function () {
    var updatedPersonnel;

    beforeEach(function (done) {
      request(app).put('/api/personnel/' + newPersonnel._id).send({
        name: 'Updated Personnel',
        info: 'This is the updated personnel!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedPersonnel = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedPersonnel = {};
    });

    it('should respond with the updated personnel', function () {
      updatedPersonnel.name.should.equal('Updated Personnel');
      updatedPersonnel.info.should.equal('This is the updated personnel!!!');
    });
  });

  describe('DELETE /api/personnel/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      request(app).delete('/api/personnel/' + newPersonnel._id).expect(204).end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when personnel does not exist', function (done) {
      request(app).delete('/api/personnel/' + newPersonnel._id).expect(404).end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});

//# sourceMappingURL=personnel.integration-compiled.js.map