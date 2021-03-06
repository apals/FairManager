'use strict';


angular.module('fairManagerApp')
  .controller('EventsCtrl', function ($scope, socket, EventService, ErrorHandlingService, Modal) {
    $scope.events = [];
    $scope.isBusy = true;

    EventService.Events.query(function (response) {
      $scope.events = response;
      $scope.isBusy = false;

      socket.syncUpdates('events', $scope.events);
    }, function (error) {
      $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'get event');
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('events');
    });

    $scope.delete = Modal.confirm.delete(function (event) {
      EventService.Event.delete({id: event._id}, function () {
        $scope.events.splice($scope.events.indexOf(event), 1);
      }, function (error) {
        $scope.error = error.data;
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'delete event');
      });
    });

  });

