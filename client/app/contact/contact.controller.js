'use strict';


angular.module('fairManagerApp')
  .controller('ContactCtrl', function ($scope, socket, ContactService, Modal) {
    $scope.contacts = [];
    $scope.isBusy = true;

    ContactService.Contacts.query(function (response) {
      $scope.contacts = response;
      $scope.isBusy = false;
      socket.syncUpdates('contacts', $scope.contacts);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('contacts');
    });

    $scope.delete = Modal.confirm.delete(function(contact) {
      ContactService.Contact.delete({id: contact._id},function() {
        angular.forEach($scope.contacts, function(u, i) {
          if (u === contact) {
            $scope.contacts.splice(i, 1);
          }
        });
      });
    });

  });

