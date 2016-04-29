'use strict';

angular.module('fairManagerApp')
  .controller('SettingsCtrl', function ($scope, SettingsService, UtilService, ErrorHandlingService) {



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
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'settings');
      });
    };
  });

