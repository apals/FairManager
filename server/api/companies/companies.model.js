'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CompaniesSchema = new mongoose.Schema({
  name: String,
  info: String,
  employees: Number,
  logoUrl: String,
  bannerUrl: String
});

export default mongoose.model('Companies', CompaniesSchema);
