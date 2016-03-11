'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/companies/new', {
        templateUrl: 'app/new-company/new-company.html',
        controller: 'NewCompanyCtrl',
        controllerAs: 'newCompany',
        authenticate: 'admin'
      })
      .when('/companies/:id', {
        templateUrl: 'app/company-detail/company-detail.html',
        controller: 'CompanyDetailCtrl',
        authenticate: 'admin'
      });
  });
