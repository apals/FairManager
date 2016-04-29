/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/companies              ->  index
 * POST    /api/companies              ->  create
 * GET     /api/companies/:id          ->  show
 * PUT     /api/companies/:id          ->  update
 * DELETE  /api/companies/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Companies from './companies.model';
import path from 'path';
import fs from 'fs';

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

    return updated.saveAsync()
      .spread(updated => {
        return updated;
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

function removeCompanyLogo(res) {
  return function (entity) {
    if (entity && entity.logoUrl) {
      var image = "client/assets/images/" + entity.logoUrl.split('/')[5];
      fs.unlink(image, function (err) {
        if (err) {
          console.log("Error deleting company logo for entity:");
          console.log(entity);
        }
      });
    }
    return entity;
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

// Gets a list of Companiess
export function index(req, res) {
  Companies.findAsync({}, {name: 1, logoUrl: 1})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Companies from the DB
export function show(req, res) {
  Companies.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Creates a new Companies in the DB
export function create(req, res, next) {
  var logo, banner;
  if (req.files && req.files.logo) logo = req.files.logo;
  if (req.files && req.files.banner) banner = req.files.banner;

  if (logo) {
    req.body.logoUrl = req.protocol + '://' + req.get('host') + "/assets/images/" + logo.path.split('/')[3];
  }

  if (banner) {
    req.body.bannerUrl = req.protocol + '://' + req.get('host') + "/assets/images/" + banner.path.split('/')[3];
  }
  
  Companies.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Companies in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  Companies.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(changeImage(req))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Companies in the DB KAN KOLLA PÅ LLOGGAN NÄRSOM
function changeImage(req) {

  return function (entity) {

    var logo, banner;
    if (req.files && req.files.logo) logo = req.files.logo;
    if (req.files && req.files.banner) banner = req.files.banner;

    if (logo) {
      entity.logoUrl = req.protocol + '://' + req.get('host') + "/assets/images/" + logo.path.split('/')[3];
    } else {
      if (entity.logoUrl) {
        entity.logoUrl = null;
      }
    }

    if (banner) {
      entity.bannerUrl = req.protocol + '://' + req.get('host') + "/assets/images/" + banner.path.split('/')[3];
    } else {
      if (entity.bannerUrl)
        entity.bannerUrl = null;
    }

    return entity;
  }
}
// Deletes a Companies from the DB

function removeCompanyBanner(res) {
  return function (entity) {
    if (entity && entity.bannerUrl) {
      var image = "client/assets/images/" + entity.bannerUrl.split('/')[5];
      fs.unlink(image, function (err) {
        if (err) {
          console.log("Error deleting company banner for entity:");
          console.log(entity);
        }
      });
    }
    return entity;
  };
}


export function destroy(req, res) {
  Companies.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeCompanyLogo(res))
    .then(removeCompanyBanner(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
