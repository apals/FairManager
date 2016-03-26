/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/personnel              ->  index
 * POST    /api/personnel              ->  create
 * GET     /api/personnel/:id          ->  show
 * PUT     /api/personnel/:id          ->  update
 * DELETE  /api/personnel/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Personnel from './personnel.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Personnels
export function index(req, res) {
  Personnel.findAsync({}, {name: 1, title: 1})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Personnel from the DB
export function show(req, res) {
  Personnel.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Personnel in the DB
export function create(req, res) {
  Personnel.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Personnel in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Personnel.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Personnel from the DB
export function destroy(req, res) {
  Personnel.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
