'use strict';

angular.module('fairManagerApp')
  .directive('detailView', function () {
    return {
      restrict: 'EA',
      scope: {
        element: '='
      },
      templateUrl: 'app/detail-view/detail-view.html',
      controller: '@', // @ symbol
      name: 'controllerName'
    };
  });
