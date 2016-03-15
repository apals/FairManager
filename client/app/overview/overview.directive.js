'use strict';

angular.module('fairManagerApp')
  .directive('overview', function () {
    return {
      templateUrl: 'app/overview/overview.html',
      restrict: 'EA',
      scope: {
        list: '=',
        type: '='

      },
      controller : "@", // @ symbol
      name:"controllerName"
    };
  });
