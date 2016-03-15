'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/personnel/new', {
        templateUrl: 'app/new-personnel/new-personnel.html',
        controller: 'NewPersonnelCtrl'
      });
  });
