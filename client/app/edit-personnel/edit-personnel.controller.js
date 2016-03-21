'use strict';

angular.module('fairManagerApp')
  .controller('EditPersonnelCtrl', function ($scope, PersonnelService, $routeParams, $location) {
    $scope.personnel = {};
    $scope.hasErrored = false;
    $scope.errorMsg = "";

    PersonnelService.Person.get({id: $routeParams.id}, function(response) {
      $scope.personnel = response;
    }, function(error) {
      $scope.personnel.error = 'There was an error fetching data';
      $scope.hasErrored = true;
      $scope.errorMsg = "Unable to fetch data. Please check your internet connection.";
    });


    $scope.updatePersonnel = function (personnel) {
      PersonnelService.Person.update({id: personnel._id}, personnel, function () {
        $location.path('/personnel');
      }, function(err) {
        $scope.hasErrored = true;
        $scope.errorMsg = "Unable to update personnel. Please check your internet connection.";
      });
    };

  });
