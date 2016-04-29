'use strict';

angular.module('fairManagerApp')
  .controller('EventDetailCtrl', function ($scope, EventService, ErrorHandlingService, $routeParams, $rootScope) {
    $scope.event = {};
    $scope.isBusy = true;

    EventService.Event.get({id: $routeParams.id}, function(response) {
      var endDate = new Date(response.endDate);
      response.endDate = formatDateToString(endDate);

      var startDate = new Date(response.startDate);
      response.startDate = formatDateToString(startDate);

      $scope.event = response;
      $scope.isBusy = false;
      $rootScope.title = 'Events - ' + $scope.event.name.charAt(0).toUpperCase() + $scope.event.name.slice(1);
    }, function(error) {
      $scope.event.error = ErrorHandlingService.getErrorMessage(error, 'fetch event data');
      console.log(error);
    });

    function formatDateToString(date){
      // 01, 02, 03, ... 29, 30, 31
      var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
      // 01, 02, 03, ... 10, 11, 12
      var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
      // 1970, 1971, ... 2015, 2016, ...
      var yyyy = date.getFullYear();

      var hours = ((date.getHours()) < 10 ? '0' : '') + date.getHours();

      var minutes = ((date.getMinutes()) < 10 ? '0' : '') + date.getMinutes();

      // create the format you want
      return dd + '-' + MM + '-' + yyyy + ' ' + hours + ':' + minutes;
    }

  });
