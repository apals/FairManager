'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/events/new', {
        templateUrl: 'app/new-event/new-event.html',
        controller: 'NewEventCtrl',
        authenticate: 'admin'
      });
  });
