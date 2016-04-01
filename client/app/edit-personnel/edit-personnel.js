'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/personnel/:id/edit', {
        templateUrl: 'app/edit-personnel/edit-personnel.html',
        controller: 'EditPersonnelCtrl',
        authenticate: 'admin'
      });
  });
