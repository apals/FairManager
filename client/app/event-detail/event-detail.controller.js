'use strict';

angular.module('fairManagerApp')
  .controller('EventDetailCtrl', function ($scope, EventService, $routeParams) {
    $scope.event = {};
    EventService.Event.get({id: $routeParams.id}, function(response) {
      $scope.event = response;
    }, function(error) {
      $scope.event.error = "There was an error fetching data";
    });

  });
