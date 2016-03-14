'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/partners', {
        templateUrl: 'app/partners/partners.html',
        controller: 'PartnersCtrl'
      });
  });
