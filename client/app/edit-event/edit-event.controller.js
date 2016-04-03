
'use strict';

angular.module('fairManagerApp')
  .controller('EditEventCtrl', function ($scope, EventService, ErrorHandlingService, $routeParams, $location, $rootScope) {

    $scope.event = {};

    EventService.Event.get({id: $routeParams.id}, function(response) {

      //This is needed to be able to prepopulate the datetime fields
      response.startDate = new Date(response.startDate);
      response.endDate = new Date(response.endDate);
      $scope.event = response;
      var title = $scope.event.name.charAt(0).toUpperCase() + $scope.event.name.slice(1);
      $rootScope.title = title;
    }, function(error) {
      $scope.event.error = 'There was an error fetching data';
      $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'fetch event data');
    });

    $scope.updateEvent = function (event) {
      EventService.Event.update({id: event._id}, event, function () {
        $location.path('/events');
      }, function(error) {
        $scope.event.error = 'There was an error updating the event';
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'update event');
      });
    };


  });
