'use strict';

angular.module('fairManagerApp').config(function ($routeProvider) {
  $routeProvider.when('/companies', {
    templateUrl: 'app/companies/companies.html',
    controller: 'CompaniesController',
    controllerAs: 'comp',
    authenticate: 'admin'
  });
});

//# sourceMappingURL=companies-compiled.js.map