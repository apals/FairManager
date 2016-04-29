/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/partners              ->  index
 * POST    /api/partners              ->  create
 * GET     /api/partners/:id          ->  show
 * PUT     /api/partners/:id          ->  update
 * DELETE  /api/partners/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Partners from './partners.model';
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

// Gets a list of Partnerss
export function index(req, res) {
  Partners.findAsync({}, {name: 1, websiteUrl: 1, logoUrl: 1})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Partners from the DB
export function show(req, res) {
  Partners.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Partners in the DB
export function create(req, res) {
  var logo;
  if (req.files && req.files.logo) logo = req.files.logo;

  if (logo) {
    req.body.logoUrl = req.protocol + '://' + req.get('host') + "/assets/images/" + logo.path.split('/')[3];
  }

  Partners.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Partners in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Partners.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(changeImage(req))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//Change the image for a certain event
function changeImage(req) {

  return function (entity) {

    var logo;
    if (req.files && req.files.logo) logo = req.files.logo;

    if (logo) {
      entity.logoUrl = req.protocol + '://' + req.get('host') + "/assets/images/" + logo.path.split('/')[3];
    } else {
      if (entity.logoUrl) {
        entity.logoUrl = null;
      }
    }

    return entity;
  }
}

// Deletes a Partners from the DB
function removePartnerLogo(res) {
  return function (entity) {
    if (entity && entity.logoUrl) {
      var image = "client/assets/images/" + entity.logoUrl.split('/')[5];
      fs.unlink(image, function (err) {
        if (err) {
          console.log("Error deleting partner logo for entity:");
          console.log(entity);
        }
      });
    }
    return entity;
  };
}
export function destroy(req, res) {
  Partners.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removePartnerLogo(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
