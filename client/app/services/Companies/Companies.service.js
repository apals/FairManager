'use strict';

angular.module('fairManagerApp')
  .factory('Companies', function ($resource) {
    // Service logic
    // ...

    this.Companiess = $resource('/api/companies/');
    this.Company = $resource('/api/companies/:id');

    return this;

  });
