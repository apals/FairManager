'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/contact', {
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactCtrl',
        authenticate: 'admin'
      });
  });
