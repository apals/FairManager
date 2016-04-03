'use strict';

angular.module('fairManagerApp')
  .controller('PersonnelDetailCtrl', function ($scope, PersonnelService, ErrorHandlingService, $routeParams, $rootScope) {
    $scope.personnel = {};
    $scope.isBusy = true;

    PersonnelService.Person.get({id: $routeParams.id}, function(response) {
      $scope.personnel = response;
      $scope.isBusy = false;
      $rootScope.title = 'Personnel - ' + $scope.personnel.name.charAt(0).toUpperCase() + $scope.personnel.name.slice(1);

    }, function(error) {
      $scope.personnel.error = ErrorHandlingService.getErrorMessage(error, 'show personnel');
      $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'show personnel');
      console.log(error);
    });

  });
