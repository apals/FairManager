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
      SettingsService.Settings.update(settings, function () {

      }, function (error) {
        console.log(error);
      });
    };
  });

