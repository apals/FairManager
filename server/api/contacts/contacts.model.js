'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ContactsSchema = new mongoose.Schema({
  name: String,
  title: String,
  email: String,
  phone: String
});

export default mongoose.model('Contacts', ContactsSchema);
