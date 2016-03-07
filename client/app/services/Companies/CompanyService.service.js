'use strict';

angular.module('fairManagerApp')
  .factory('CompanyService', function ($resource) {
    // Service logic
    // ...

    this.Companies = $resource('/api/companies/');
    this.Company = $resource('/api/companies/:id', null, {
      'update': {method: 'PUT'}
    });

    return this;

  });
