'use strict';

angular.module('fairManagerApp')
  .controller('PersonnelDetailCtrl', function ($scope, PersonnelService, $routeParams, $rootScope) {
    $scope.personnel = {};
    $scope.isBusy = true;

    PersonnelService.Person.get({id: $routeParams.id}, function(response) {
      $scope.personnel = response;
      $scope.isBusy = false;
      $rootScope.title = 'Personnel - ' + $scope.personnel.name.charAt(0).toUpperCase() + $scope.personnel.name.slice(1);

    }, function(error) {
      $scope.personnel.error = 'Unable show personnel. Please check your internet connection and/or your login credentials.';
      console.log(error);
    });

  });
