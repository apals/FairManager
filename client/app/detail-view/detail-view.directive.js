'use strict';

angular.module('fairManagerApp')
  .directive('detailView', function (UtilService) {
    return {
      restrict: 'EA',
      scope: {
        element: '='
      },
      templateUrl: 'app/detail-view/detail-view.html',
      link: function ($scope) {
        $scope.splitCamelCase = UtilService.splitCamelCase;
      },
      controller: '@', // @ symbol
      name: 'controllerName'
    };
  });
