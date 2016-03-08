'use strict';

angular.module('fairManagerApp')
  .directive('topNavbar', function () {
    return {
      templateUrl: 'app/top-navbar/top-navbar.html',
      restrict: 'E',
      controller: 'TopNavbarController',
      controllerAs: 'topnav'
    };
  });
