'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://admin:password@ds019468.mlab.com:19468/fairmanager-dev'
  },

  // Seed database on startup
  seedDB: true

};
