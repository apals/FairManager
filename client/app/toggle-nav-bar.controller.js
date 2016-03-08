'use strict';

angular.module('fairManagerApp')
  .controller('ToggleNavbarController', function ($scope, NavbarService) {
    console.log("togglenavbar");

    $scope.getClassName = function() {
      return NavbarService.getCurrentClass();
    };

  });
