/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Settings from '../api/settings/settings.model'

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
        provider: 'local',
        role: 'user',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'owner',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      })
      .then(() => {
        console.log('finished populating users');
      });
  });

Settings.find({}).removeAsync()
  .then(() => {
    Settings.createAsync({
      primaryColor: '#51039a',
      primaryTextColor: '#404040',
      titleTextColor: '#ffffff',
      tintColor: '#ffffff',
      contentMode: 'Light',



      accentColor: '#RRGGBB',
      primarySubTextColor: '#RRGGBB',
      backgroundColor: '#RRGGBB',
      tabs: [
        {
          name: "exhibitor",
          title: "Exhibitors",
          isActive: true
        },
        {
          name: "event",
          title: "Events",
          isActive: true
        },
        {
          name: "partner",
          title: "Partners",
          isActive: true
        },
        {
          name: "contact",
          title: "Contacts",
          isActive: true
        },
        {
          name: "personnel",
          title: "Personnel",
          isActive: true
        }
      ]
    }).then(() => {
      console.log('finished populating settings');
    });
  });
