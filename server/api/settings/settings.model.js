'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var SettingsSchema = new mongoose.Schema({
  primaryColor: String,
  accentColor: String,
  primaryTextColor: String,
  primarySubTextColor: String,
  backgroundColor: String,
  tabs: [{
    name: String,
    isActive: Boolean
  }]
});

export default mongoose.model('Settings', SettingsSchema);
