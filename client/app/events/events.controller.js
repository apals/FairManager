'use strict';


angular.module('fairManagerApp')
  .controller('EventsCtrl', function ($scope, socket, EventService, Modal) {
    $scope.events = [];
    $scope.isBusy = true;

    EventService.Events.query(function (response) {
      $scope.events = response;
      $scope.isBusy = false;
      socket.syncUpdates('events', $scope.events);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('events');
    });

    $scope.deleteEvent = Modal.confirm.delete(function (event) {
      EventService.Event.delete({id: event._id}, function (response) {
        angular.forEach($scope.events, function (u, i) {
          if (u === event) {
            $scope.events.splice(i, 1);
          }
        });
      });
    });

  });

