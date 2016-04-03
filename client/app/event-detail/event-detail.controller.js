'use strict';

angular.module('fairManagerApp')
  .controller('EventDetailCtrl', function ($scope, EventService, ErrorHandlingService, $routeParams, $rootScope) {
    $scope.event = {};
    $scope.isBusy = true;

    EventService.Event.get({id: $routeParams.id}, function(response) {
      $scope.event = response;
      $scope.isBusy = false;
      $rootScope.title = 'Events - ' + $scope.event.name.charAt(0).toUpperCase() + $scope.event.name.slice(1);
    }, function(error) {
      $scope.event.error = ErrorHandlingService.getErrorMessage(error, 'fetch event data');
      console.log(error);
    });

  });
