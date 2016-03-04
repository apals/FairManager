'use strict';

angular.module('fairManagerApp', [
  'fairManagerApp.auth',
  'fairManagerApp.admin',
  'fairManagerApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngResource',
  'ngRoute',
  'btford.socket-io',
  'validation.match'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/companies'
      });

    $locationProvider.html5Mode(true);
  });
