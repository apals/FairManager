'use strict';

angular.module('fairManagerApp')
  .service('EventService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.Events = $resource('/api/events/');
    this.Event = $resource('/api/events/:id', null, {
      'update': {method: 'PUT'}
    });

    return this;
  });
