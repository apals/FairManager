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
      primaryColorDark: '#51039a',
      primaryTextColor: '#404040',
      titleTextColor: '#ffffff',
      tintColor: '#ffffff',
      contentMode: 'Light',
      accentColor: '#2103aa',
      primarySubTextColor: '#2103aa',
      backgroundColor: '#2103aa',
      tabs: [
        {
          name: "Exhibitors",
          isActive: true
        },
        {
          name: "Events",
          isActive: true
        },
        {
          name: "Partners",
          isActive: true
        },
        {
          name: "Personnel",
          isActive: true
        }
      ]
    }).then(() => {
      console.log('finished populating settings');
    });
  });
