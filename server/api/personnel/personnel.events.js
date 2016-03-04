/**
 * Personnel model events
 */

'use strict';

import {EventEmitter} from 'events';
var Personnel = require('./personnel.model');
var PersonnelEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PersonnelEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Personnel.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PersonnelEvents.emit(event + ':' + doc._id, doc);
    PersonnelEvents.emit(event, doc);
  }
}

export default PersonnelEvents;
