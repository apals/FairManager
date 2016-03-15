'use strict';

angular.module('fairManagerApp')
  .service('PartnerService', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.Partners = $resource('/api/partners/');
    this.Partner = $resource('/api/partner/:id', null, {
      'update': {method: 'PUT'}
    });

    return this;
  });
