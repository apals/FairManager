'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/personnel/new', {
        templateUrl: 'app/new-personnel/new-personnel.html',
        controller: 'NewPersonnelCtrl'
      })
      .when('/personnel/:id', {
        templateUrl: 'app/personnel-detail/personnel-detail.html',
        controller: 'PersonnelDetailCtrl'
      });
  });
