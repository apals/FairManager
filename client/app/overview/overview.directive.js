'use strict';

angular.module('fairManagerApp')
  .directive('overview', function ($rootScope) {
    return {
      templateUrl: 'app/overview/overview.html',
      restrict: 'EA',
      scope: {
        list: '=',
        type: '='

      },
      controller : '@', // @ symbol
      name:'controllerName',
      link: function(scope, element, attributes) {
        var string = attributes.list;
        var title = string.charAt(0).toUpperCase() + string.slice(1);
        $rootScope.title = title;
      }
    }
  });
