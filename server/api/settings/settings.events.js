/**
 * Settings model events
 */

'use strict';

import {EventEmitter} from 'events';
var Settings = require('./settings.model');
var SettingsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SettingsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Settings.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SettingsEvents.emit(event + ':' + doc._id, doc);
    SettingsEvents.emit(event, doc);
  }
}

export default SettingsEvents;
