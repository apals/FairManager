'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ContactsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  title: String,
  email: String,
  phone: String
});

export default mongoose.model('Contacts', ContactsSchema);
