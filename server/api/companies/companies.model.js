'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CompaniesSchema = new mongoose.Schema({
  name: {type: String, required: true},
  info: String,
  employees: Number,
  logoUrl: String,
  bannerUrl: String,
  contactEmail: String
});

export default mongoose.model('Companies', CompaniesSchema);
