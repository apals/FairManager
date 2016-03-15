'use strict';


angular.module('fairManagerApp')
  .controller('PersonnelCtrl', function ($scope, socket, PersonnelService, Modal) {
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

    $scope.delete = Modal.confirm.delete(function(person) {
      PersonnelService.Person.delete({id: person._id},function(response) {
        angular.forEach($scope.personnel, function(u, i) {
          if (u === person) {
            $scope.personnel.splice(i, 1);
          }
        });
      });
    });

  });

