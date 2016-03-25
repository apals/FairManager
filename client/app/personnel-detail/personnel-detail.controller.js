'use strict';

angular.module('fairManagerApp')
  .controller('PersonnelDetailCtrl', function ($scope, PersonnelService, $routeParams) {
    $scope.personnel = {};
    $scope.isBusy = true;

    PersonnelService.Person.get({id: $routeParams.id}, function(response) {
      $scope.personnel = response;
      $scope.isBusy = false;
      
    }, function(error) {
      $scope.personnel.error = 'Unable show personnel. Please check your internet connection and/or your login credentials.';
      console.log(error);
    });

  });
