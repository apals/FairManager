
'use strict';

angular.module('fairManagerApp')
  .controller('EditEventCtrl', function ($scope, EventService, $routeParams, $location, $rootScope) {

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
      $scope.errorMsg = 'Unable fetch data. Please check your internet connection.' + error.status;
    });

    $scope.updateEvent = function (event) {
      EventService.Event.update({id: event._id}, event, function () {
        $location.path('/events');
      }, function(err) {
        $scope.event.error = 'There was an error updating the event';
        $scope.errorMsg = 'Unable to update event. Please check your internet connection and/or your login credentials. Error status code: ' + err.status;
      });
    };


  });
