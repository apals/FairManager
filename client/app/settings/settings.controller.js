'use strict';

angular.module('fairManagerApp')
  .controller('SettingsCtrl', function ($scope, SettingsService) {
    $scope.settings = SettingsService.Settings.get(function (response) {
      console.log(response);
    }, function(error) {
      console.log(error);
    });
  });
