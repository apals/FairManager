/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/events              ->  index
 * POST    /api/events              ->  create
 * GET     /api/events/:id          ->  show
 * PUT     /api/events/:id          ->  update
 * DELETE  /api/events/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Events from './events.model';
import fs from 'fs';

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

// Gets a list of Eventss
export function index(req, res) {
  Events.findAsync({}, {name: 1, startDate: 1, endDate: 1, imageUrl: 1})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Events from the DB
export function show(req, res) {
  Events.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Creates a new Event in the DB
export function create(req, res, next) {
  var logo;
  if (req.files && req.files.logo) logo = req.files.logo;

  if (logo) {
    req.body.imageUrl = req.protocol + '://' + req.get('host') + "/assets/images/" + logo.path.split('/')[3];
  }

  Events.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}


// Updates an existing Events in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Events.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(changeImage(req))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Companies in the DB KAN KOLLA PÅ LLOGGAN NÄRSOM
function changeImage(req) {

  return function (entity) {

    var logo;
    if (req.files && req.files.logo) logo = req.files.logo;

    if (logo) {
      entity.imageUrl = req.protocol + '://' + req.get('host') + "/assets/images/" + logo.path.split('/')[3];
    } else {
      if (entity.imageUrl) {
        entity.imageUrl = null;
      }
    }

    return entity;
  }
}

// Deletes a Events from the DB
function removeEventImage(res) {
  return function (entity) {
    if (entity && entity.imageUrl) {
      var image = "client/assets/images/" + entity.imageUrl.split('/')[5];
      fs.unlink(image, function (err) {
        if (err) {
          console.log("Error deleting image logo for entity:");
          console.log(entity);
        }
      });
    }
    return entity;
  };
}

export function destroy(req, res) {
  Events.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEventImage(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
