'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var EventsSchema = new mongoose.Schema({
  name: String,
  info: String,
  location: String,
  startDate: Date,
  endDate: Date,
  imageUrl: String
});

export default mongoose.model('Events', EventsSchema);
