'use strict';

angular.module('fairManagerApp')
  .controller('TopNavbarController', function ($scope, NavbarService) {

    $scope.toggleMenu = function () {
      if (NavbarService.getCurrentClass() === "inactive") {
        NavbarService.setCurrentClass("active");
      } else {
        NavbarService.setCurrentClass("inactive");
      }
    }

  });
