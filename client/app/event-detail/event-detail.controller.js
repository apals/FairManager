'use strict';

angular.module('fairManagerApp')
  .controller('EventDetailCtrl', function ($scope, EventService, $routeParams) {
    $scope.event = {};
    $scope.isBusy = true;

    EventService.Event.get({id: $routeParams.id}, function(response) {
      $scope.event = response;
      $scope.isBusy = false;
    }, function(error) {
      $scope.event.error = 'Unable to fetch event details. Please check your internet connection and/or your login credentials.';
      console.log(error);
    });

  });
