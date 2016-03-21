'use strict';

angular.module('fairManagerApp')
  .controller('NewPersonnelCtrl', function ($scope, PersonnelService, $location) {

    $scope.hasErrored = false;
    $scope.errorMsg = "";
    $scope.addPersonnel = function(personnel) {

      var newPersonnel = new PersonnelService.Personnel(personnel);
      newPersonnel.$save(function() {
        $location.path('/personnel');
      }, function(error) {
        $scope.hasErrored = true;
        $scope.errorMsg = "Unable to create new company. Technical data: " + response.status + ': ' + response.data;
      });
    };
  });
