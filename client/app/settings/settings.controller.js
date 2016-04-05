'use strict';

angular.module('fairManagerApp')
  .controller('SettingsCtrl', function ($scope, SettingsService, UtilService) {

    $scope.splitCamelCase = UtilService.splitCamelCase;
    SettingsService.Settings.get(function (response) {
      $scope.settings = response;
    }, function (error) {
      console.log(error);
    });

    $scope.updateSettings = function (settings) {
      if (settings.__v) delete settings.__v;

      SettingsService.Settings.update(settings, function (response) {
        console.log(response);
      }, function (error) {
        console.log(error);
      });
    }
  });
