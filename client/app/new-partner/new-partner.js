'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/partners/new', {
        templateUrl: 'app/new-partner/new-partner.html',
        controller: 'NewPartnerCtrl',
        authenticate: 'admin'
      });
  });
