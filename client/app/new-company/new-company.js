'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/companies/new', {
        templateUrl: 'app/new-company/new-company.html',
        controller: 'NewCompanyCtrl',
        controllerAs: 'newCompany'
      });
  });
