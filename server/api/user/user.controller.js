'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.role = 'user';
  newUser.saveAsync()
    .spread(function (user) {
      var token = jwt.sign({_id: user._id}, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({token: token, user: {email: user.email, name: user.name, _id: user._id, role: user.role}});
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
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
/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findOneAsync({_id: req.params.id})
    .then(handleIsAdmin(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

function handleIsAdmin(res) {
  return function(entity) {
    if(entity && entity.role === 'owner') {
      res.status(403).end("You cannot delete the owner");
      return null;
    }
    return entity;
  }
}



/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({_id: userId}, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
