'use strict';

angular.module('fairManagerApp')
  .controller('SettingsCtrl', function ($scope, SettingsService) {
    $scope.settings = {};
    $scope.isBusy = true;
    SettingsService.Settings.get(function (response) {
      $scope.settings = response;
      $scope.settings.name = "Settings";
      $scope.isBusy = false;
    }, function (error) {
      console.log(error);
    });
  });
