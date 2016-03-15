'use strict';

angular.module('fairManagerApp')
  .controller('NewEventCtrl', function ($scope, EventService, $location, Upload, $timeout) {

    $scope.addEvent = function (event) {

      console.log(event);
      if (event) {
        var upload = Upload.upload({
          url: '/api/events',
          data: event
        });

        upload.then(function (response) {
          $timeout(function () {
            //$scope.eventLogo.result = response.data;
            if (response.status === 201) {
              $location.path('/events');
            }
          });
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          //$scope.eventLogo.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }

    };

  });
