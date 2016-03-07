'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/companies/:id', {
        templateUrl: 'app/company-detail/company-detail.html',
        controller: 'CompanyDetailCtrl'
      });
  });
