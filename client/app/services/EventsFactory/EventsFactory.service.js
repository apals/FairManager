'use strict';

angular.module('fairManagerApp')
  .factory('EventsFactory', function ($resource) {

    this.Events = $resource('/api/events/');
    this.Event = $resource('/api/events/:id');


    return this;
  });
