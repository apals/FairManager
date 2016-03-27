'use strict';

angular.module('fairManagerApp')
  .directive('detailView', function ($rootScope) {
    return {
      restrict: 'EA',
      scope: {
        element: '='
      },
      templateUrl: 'app/detail-view/detail-view.html',
      link: function ($scope, element, attributes, ctrl) {
        $scope.splitCamelCase = function (string) {
          return string.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
            return str.toUpperCase();
          });
        };
      },
      controller: '@', // @ symbol
      name: 'controllerName'
    };
  });
