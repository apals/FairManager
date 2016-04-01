'use strict';

angular.module('fairManagerApp')
  .service('SettingsService', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.Settings = $resource('/api/settings/');
    return this;
  });
