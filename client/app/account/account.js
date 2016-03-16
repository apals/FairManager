'use strict';

angular.module('fairManagerApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/logout', {
        name: 'logout',
        referrer: '/',
        template: '',
        controller: function($location, $route, Auth) {
          Auth.logout();
        }
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.name === 'logout' && current && current.originalPath && !current.authenticate) {
        next.referrer = current.originalPath;
      }
    });
  });
