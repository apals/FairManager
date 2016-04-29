'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var SettingsSchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    validate: [colorValidator, 'Invalid primary color. Input format should be \'#RRGGBB\'.']
  },
  primaryTextColor: {
    type: String,
    validate: [colorValidator, 'Invalid primary text color. Input format should be \'#RRGGBB\'.']
  },
  titleTextColor: {
    type: String,
    validate: [colorValidator, 'Invalid title text color. Input format should be \'#RRGGBB\'.']
  },
  tintColor: {
    type: String,
    validate: [colorValidator, 'Invalid tint color. Input format should be \'#RRGGBB\'.']
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
    validate: [colorValidator, 'Invalid accent color. Input format should be \'#RRGGBB\'.']
  },
  primarySubTextColor: {
    type: String,
    validate: [colorValidator, 'Invalid primary subtext color. Input format should be \'#RRGGBB\'.']
  },
  backgroundColor: {
    type: String,
    validate: [colorValidator, 'Invalid background color. Input format should be \'#RRGGBB\'.']
  }
});

function colorValidator(v) {
  return v.indexOf('#') === 0 && v.length === 7;
}

export default mongoose.model('Settings', SettingsSchema);
