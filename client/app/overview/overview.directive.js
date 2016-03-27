'use strict';

angular.module('fairManagerApp')
  .directive('overview', function (Auth) {
    return {
      templateUrl: 'app/overview/overview.html',
      restrict: 'EA',
      scope: {
        list: '=',
        type: '='

      },
      controller : '@', // @ symbol
      name:'controllerName',
      link: function($scope) {
        console.log("asd");
        $scope.hasRole = Auth.hasRole;
        console.log(Auth.hasRole);
        console.log($scope.hasRole('admin'));
      }
    };
  });
