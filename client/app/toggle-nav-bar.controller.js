'use strict';

angular.module('fairManagerApp')
  .controller('ToggleNavbarController', function ($scope, NavbarService) {

    $scope.getClassName = function() {
      return NavbarService.getCurrentClass();
    };

  });
