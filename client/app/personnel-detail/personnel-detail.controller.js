'use strict';

angular.module('fairManagerApp')
  .controller('PersonnelDetailCtrl', function ($scope, PersonnelService, ErrorHandlingService, $routeParams) {
    $scope.personnel = {};
    $scope.isBusy = true;

    PersonnelService.Person.get({id: $routeParams.id}, function(response) {
      $scope.personnel = response;
      $scope.isBusy = false;

    }, function(error) {
      $scope.personnel.error = ErrorHandlingService.getErrorMessage(error, 'show personnel');
      $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'show personnel');
      console.log(error);
    });

  });
