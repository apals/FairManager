'use strict';

angular.module('fairManagerApp.auth', [
  'fairManagerApp.constants',
  'fairManagerApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
