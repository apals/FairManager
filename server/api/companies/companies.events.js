/**
 * Companies model events
 */

'use strict';

import {EventEmitter} from 'events';
var Companies = require('./companies.model');
var CompaniesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CompaniesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Companies.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CompaniesEvents.emit(event + ':' + doc._id, doc);
    CompaniesEvents.emit(event, doc);
  }
}

export default CompaniesEvents;
