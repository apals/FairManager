'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var SettingsSchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    validate: [colorValidator, 'That\'s not a valid color. Input format should be \'#RRGGBBAA\'']
  },
  primaryTextColor: {
    type: String,
    validate: [colorValidator, 'That\'s not a valid color. Input format should be \'#RRGGBBAA\' a valid color']
  },
  titleTextColor: {
    type: String,
    validate: [colorValidator, 'That\'s not a valid color. Input format should be \'#RRGGBBAA\' a valid color']
  },
  tintColor: {
    type: String,
    validate: [colorValidator, 'That\'s not a valid color. Input format should be \'#RRGGBBAA\' a valid color']
  },
  contentMode: {
    type: String
  },
  tabs: [{
    name: String,
    isActive: Boolean
  }],
  exhibitorCellHeight: {
    type: Number
  },

  accentColor: {
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
  }
});

function colorValidator(v) {
  return v.indexOf('#') === 0 && v.length === 7;
}

export default mongoose.model('Settings', SettingsSchema);
