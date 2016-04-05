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
    var updated = _.merge(entity, updates);
    return updates.saveAsync()
      .spread(updates => {
        return updates;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
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
  Settings.findOneAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Settings from the DB
export function show(req, res) {
  Settings.findOneAsync()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Settings in the DB
export function create(req, res) {
  Settings.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Settings in the DB
export function update(req, res) {
  if (req.body._id) delete req.body._id;
  for (var i = 0; i < req.body.tabs.length; i++) {
    if (req.body.tabs[i]._id) delete req.body.tabs[i]._id;
  }
  Settings.findOneAsync()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));

  create(req, res);

}

// Deletes a Settings from the DB
export function destroy(req, res) {
  Settings.findOneAsync()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
