'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/events/new', {
        templateUrl: 'app/new-event/new-event.html',
        controller: 'NewEventCtrl'
      })
      .when('/events/:id', {
        templateUrl: 'app/event-detail/event-detail.html',
        controller: 'EventDetailCtrl'
      });
  });
