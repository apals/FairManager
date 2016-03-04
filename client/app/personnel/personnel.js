'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/personnel', {
        templateUrl: 'app/personnel/personnel.html',
        controller: 'PersonnelCtrl'
      });
  });
