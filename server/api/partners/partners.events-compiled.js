/**
 * Partners model events
 */

'use strict';

import { EventEmitter } from 'events';
var Partners = require('./partners.model');
var PartnersEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PartnersEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Partners.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    PartnersEvents.emit(event + ':' + doc._id, doc);
    PartnersEvents.emit(event, doc);
  };
}

export default PartnersEvents;

//# sourceMappingURL=partners.events-compiled.js.map