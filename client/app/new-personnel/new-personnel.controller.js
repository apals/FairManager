'use strict';

angular.module('fairManagerApp')
  .controller('NewPersonnelCtrl', function ($scope, PersonnelService, $location) {
    $scope.addPersonnel = function(personnel) {

      var newPersonnel = new PersonnelService.Personnel(personnel);
      newPersonnel.$save(function(response) {
        $location.path('/personnel');
      }, function(error) {

      });

    }
  });