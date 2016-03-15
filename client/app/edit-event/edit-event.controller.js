
'use strict';

angular.module('fairManagerApp')
  .controller('EditEventCtrl', function ($scope, EventService, $routeParams, $location) {

    $scope.event = {};
    EventService.Event.get({id: $routeParams.id}, function(response) {
      $scope.event = response;
    }, function(error) {
      $scope.event.error = "There was an error fetching data";
    });

    $scope.updateEvent = function (event) {
      if (!event) {
        return;
      }

      EventService.Event.update({id: event._id}, event, function (response) {
        $location.path('/events');
      }, function(err) {
      });

    };


  });
