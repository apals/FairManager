'use strict';

angular.module('fairManagerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      });
  });
