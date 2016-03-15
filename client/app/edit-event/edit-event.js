'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/events/:id/edit', {
        templateUrl: 'app/edit-event/edit-event.html',
        controller: 'EditEventCtrl'
      });
  });
