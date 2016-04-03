'use strict';

angular.module('fairManagerApp')
  .directive('overview', function (Auth, $rootScope) {
    return {
      templateUrl: 'app/overview/overview.html',
      restrict: 'EA',
      scope: {
        list: '=',
        type: '='

      },
      controller: '@', // @ symbol
      name: 'controllerName',
      link: function ($scope, element, attributes) {
        $scope.hasRole = Auth.hasRole;
        var string = attributes.list;
        $rootScope.title = string.charAt(0).toUpperCase() + string.slice(1);
      }
    };
  });
