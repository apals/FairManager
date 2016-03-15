'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PersonnelSchema = new mongoose.Schema({
  name: {type: String, required: true},
  title: String,
  group: String
});

export default mongoose.model('Personnel', PersonnelSchema);
