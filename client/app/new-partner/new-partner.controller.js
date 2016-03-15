'use strict';

angular.module('fairManagerApp')
  .controller('NewPartnerCtrl', function ($scope, PartnerService, $location, Upload, $timeout) {

    $scope.addPartner = function (partner) {

      var upload = Upload.upload({
        url: '/api/partners',
        data: partner
      });

      upload.then(function (response) {
        $timeout(function () {
          //$scope.eventLogo.result = response.data;
          if (response.status === 201) {
            $location.path('/partners');
          }
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        //$scope.eventLogo.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });


    };

  });