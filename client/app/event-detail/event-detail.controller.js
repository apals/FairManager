'use strict';

angular.module('fairManagerApp')
  .controller('EventDetailCtrl', function ($scope, EventService, ErrorHandlingService, $routeParams) {
    $scope.event = {};
    $scope.isBusy = true;

    EventService.Event.get({id: $routeParams.id}, function(response) {
      $scope.event = response;
      $scope.isBusy = false;
    }, function(error) {
      $scope.event.error = ErrorHandlingService.getErrorMessage(error, 'fetch event data');
      console.log(error);
    });

  });
