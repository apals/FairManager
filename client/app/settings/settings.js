'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/settingss', {
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsCtrl'
      });
  });
