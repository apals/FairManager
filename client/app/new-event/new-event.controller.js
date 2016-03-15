'use strict';

angular.module('fairManagerApp')
  .controller('NewEventCtrl', function ($scope, EventService, $location, Upload, $timeout) {

    $scope.addEvent = function () {

      console.log("addevent");
      if ($scope.eventLogo) {
        $scope.eventLogo.upload = Upload.upload({
          url: '/api/events',
          data: {
            name: $scope.eventName,
            info: $scope.eventInfo,
            logo: $scope.eventLogo,
            startDate: $scope.startDate,
            endDate: $scope.endDate
          }
        });

        $scope.eventLogo.upload.then(function (response) {
          $timeout(function () {
            $scope.eventLogo.result = response.data;
            if (response.status === 201) {
              $location.path('/events');
            }
          });
        }, function (response) {
          console.log("other one" + response);
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          $scope.eventLogo.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      } else {
        var newEvent = new EventService.Events({
          name: $scope.eventName,
          info: $scope.eventInfo,
          startDate: $scope.startDate,
          endDate: $scope.endDate
        });
        newEvent.$save(function (response) {
          $location.path('/events');
        }, function (error) {
        });
      }

    };

  });
