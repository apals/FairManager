'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/partners/:id/edit', {
        templateUrl: 'app/edit-partner/edit-partner.html',
        controller: 'EditPartnerCtrl',
        authenticate: 'admin'
      });
  });
