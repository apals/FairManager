'use strict';

var express = require('express');
var controller = require('./settings.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.put('/', auth.hasRole('admin'), controller.update);
router.patch('/', auth.hasRole('admin'), controller.update);

module.exports = router;
