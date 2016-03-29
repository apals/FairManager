'use strict';


angular.module('fairManagerApp')
  .controller('PersonnelCtrl', function ($scope, socket, PersonnelService, ErrorHandlingService, Modal) {
    $scope.personnel = [];
    $scope.isBusy = true;

    PersonnelService.Personnel.query(function (response) {
      $scope.personnel = response;
      $scope.isBusy = false;
      socket.syncUpdates('personnel', $scope.personnel);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('personnel');
    });

    $scope.delete = Modal.confirm.delete(function (person) {
      PersonnelService.Person.delete({id: person._id}, function () {
        $scope.personnel.splice($scope.personnel.indexOf(person), 1);
      }, function (error) {
        $scope.error = error.data;
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'show personnel');
      });
    });

  });

