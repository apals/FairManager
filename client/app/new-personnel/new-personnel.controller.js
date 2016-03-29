'use strict';

angular.module('fairManagerApp')
  .controller('NewPersonnelCtrl', function ($scope, PersonnelService, ErrorHandlingService, $location) {

    $scope.addPersonnel = function(personnel) {

      var newPersonnel = new PersonnelService.Personnel(personnel);
      newPersonnel.$save(function() {
        $location.path('/personnel');
      }, function(error) {
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'create personnel');
      });
    };
  });
