'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PartnersSchema = new mongoose.Schema({
  name: String,
  websiteUrl: String,
  logoUrl: String
});

export default mongoose.model('Partners', PartnersSchema);
