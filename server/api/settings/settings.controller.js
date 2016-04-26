/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/settingss              ->  index
 * POST    /api/settingss              ->  create
 * GET     /api/settingss/:id          ->  show
 * PUT     /api/settingss/:id          ->  update
 * DELETE  /api/settingss/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Settings from './settings.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {

    var updated = _.assign(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}


function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Settingss
export function index(req, res) {
  Settings.findOneAsync({})
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Updates an existing Settings in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Settings.findOneAsync()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
