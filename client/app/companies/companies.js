'use strict';

angular.module('fairManagerApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/companies', {
        templateUrl: 'app/companies/companies.html',
        controller: 'CompaniesController',
        controllerAs: 'comp'
      });
  });
