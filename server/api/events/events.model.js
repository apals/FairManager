'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var EventsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  info: String,
  location: String,
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  imageUrl: String
});

export default mongoose.model('Events', EventsSchema);
