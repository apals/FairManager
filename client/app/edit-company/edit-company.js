'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/companies/:id/edit', {
        templateUrl: 'app/edit-company/edit-company.html',
        controller: 'EditCompanyCtrl'
      });
  });
