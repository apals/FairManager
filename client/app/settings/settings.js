'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/appsettings', {
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsCtrl'
      });
  });
