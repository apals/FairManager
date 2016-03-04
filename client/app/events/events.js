'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/events', {
        templateUrl: 'app/events/events.html',
        controller: 'EventsCtrl'
      });
  });
