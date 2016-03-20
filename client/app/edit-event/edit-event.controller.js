
'use strict';

angular.module('fairManagerApp')
  .controller('EditEventCtrl', function ($scope, EventService, $routeParams, $location) {

    $scope.event = {};
    EventService.Event.get({id: $routeParams.id}, function(response) {

      //This is needed to be able to prepopulate the datetime fields
      response.startDate = new Date(response.startDate);
      response.endDate = new Date(response.endDate);
      $scope.event = response;
    }, function(error) {
      $scope.event.error = 'There was an error fetching data';
      console.log(error);
    });

    $scope.updateEvent = function (event) {
      EventService.Event.update({id: event._id}, event, function () {
        $location.path('/events');
      }, function(err) {
        $scope.event.error = 'There was an error updating the event';
        console.log(err);
      });
    };


  });
