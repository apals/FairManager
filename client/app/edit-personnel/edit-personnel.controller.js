'use strict';

angular.module('fairManagerApp')
  .controller('EditPersonnelCtrl', function ($scope, PersonnelService, ErrorHandlingService, $routeParams, $location) {
    $scope.personnel = {};

    PersonnelService.Person.get({id: $routeParams.id}, function(response) {
      $scope.personnel = response;
      var title = $scope.personnel.name.charAt(0).toUpperCase() + $scope.personnel.name.slice(1);
      $rootScope.title = title;
    }, function(error) {
      $scope.personnel.error = 'There was an error fetching data';
      $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'fetch personnel data');
    });


    $scope.updatePersonnel = function (personnel) {
      PersonnelService.Person.update({id: personnel._id}, personnel, function () {
        $location.path('/personnel');
      }, function(error) {
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'update personnel');
      });
    };

  });
