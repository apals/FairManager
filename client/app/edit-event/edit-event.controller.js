
'use strict';

angular.module('fairManagerApp')
  .controller('EditEventCtrl', function ($scope, EventService, ErrorHandlingService, $routeParams, $location, $rootScope, Upload) {

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
      var newEvent = {
        name: event.name,
        logo: event.logo
      };

      if(event.imageUrl !== null && event.imageUrl !== 'null' && !event.logo) {
        newEvent.imageUrl = event.imageUrl;
      }

      var upload = Upload.upload({
        method: 'PUT',
        url: '/api/events/' + event._id,
        data: newEvent
      });

      upload.then(function () {
        $location.path('/events');
      }, function (error) {
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'create event');
      }, function () {
        // Math.min is to fix IE which reports 200% sometimes
        //$scope.eventLogo.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    };


  });
