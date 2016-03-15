'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CompaniesSchema = new mongoose.Schema({
  name: {type: String, required: true},
  info: String,
  logoUrl: String,
  bannerUrl: String,
  active: Boolean
});

export default mongoose.model('Companies', CompaniesSchema);
