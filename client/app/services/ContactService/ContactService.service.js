'use strict';

angular.module('fairManagerApp')
  .service('ContactService', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.Contacts = $resource('/api/contacts/');
    this.Contact = $resource('/api/contacts/:id', null, {
      'update': {method: 'PUT'}
    });

    return this;
  });
