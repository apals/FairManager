'use strict';

angular.module('fairManagerApp')
  .service('PersonnelService', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.Personnel = $resource('/api/personnel/');
    this.Person = $resource('/api/personnel/:id', null, {
      'update': {method: 'PUT'}
    });

    return this;
  });
