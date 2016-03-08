'use strict';

angular.module('fairManagerApp')
  .controller('TopNavbarController', function ($scope, NavbarService) {
    console.log("topnavbarcontr1");

    $scope.toggleMenu = function () {
      if (NavbarService.getCurrentClass() === "inactive") {
        NavbarService.setCurrentClass("active");
      } else {
        NavbarService.setCurrentClass("inactive");
      }
      console.log("toggle menu");
    }

  });
