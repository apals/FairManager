/**
 * Contacts model events
 */

'use strict';

import {EventEmitter} from 'events';
var Contacts = require('./contacts.model');
var ContactsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ContactsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Contacts.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ContactsEvents.emit(event + ':' + doc._id, doc);
    ContactsEvents.emit(event, doc);
  }
}

export default ContactsEvents;
