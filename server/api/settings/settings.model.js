'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var SettingsSchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    validate: [colorValidator, 'That\'s not a valid color. Input format should be \'#RRGGBBAA\'']
  },
  accentColor: {
    type: String,
    validate: [colorValidator, 'That\'s not a valid color. Input format should be \'#RRGGBBAA\' a valid color']
  },
  primaryTextColor: {
    type: String,
    validate: [colorValidator, 'That\'s not a valid color. Input format should be \'#RRGGBBAA\' a valid color']
  },
  primarySubTextColor: {
    type: String,
    validate: [colorValidator, 'That\'s not a valid color. Input format should be \'#RRGGBBAA\' a valid color']
  },
  backgroundColor: {
    type: String,
    validate: [colorValidator, 'That\'s not a valid color. Input format should be \'#RRGGBBAA\' a valid color']
  },
  tabs: [{
    name: String,
    isActive: Boolean
  }]
});

function colorValidator(v) {
  return v.indexOf('#') === 0 && v.length === 9;
}

export default mongoose.model('Settings', SettingsSchema);
