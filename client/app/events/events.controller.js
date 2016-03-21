'use strict';


angular.module('fairManagerApp')
  .controller('EventsCtrl', function ($scope, socket, EventService, Modal) {
    $scope.events = [];
    $scope.isBusy = true;

    EventService.Events.query(function (response) {
      $scope.events = response;
      $scope.isBusy = false;
      $scope.errorMsg = "";

      socket.syncUpdates('events', $scope.events);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('events');
    });

    $scope.delete = Modal.confirm.delete(function (event) {
      EventService.Event.delete({id: event._id}, function () {
        $scope.events.splice($scope.events.indexOf(event), 1);
      }, function (error) {
        $scope.error = error.data;
        $scope.errorMsg = "Unable to perform deletion. Please check your internet connection and/or your login credentials.";
      });
    });

  });

