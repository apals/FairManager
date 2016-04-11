'use strict';

angular.module('fairManagerApp')
  .controller('NewPartnerCtrl', function ($scope, PartnerService, ErrorHandlingService, $location, Upload, $timeout) {

    $scope.deleteLogo = function (event, partner) {
      event.preventDefault();
      partner.logo = null;
    };

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
      }, function (error) {
            $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'create partner');
      }, function () {
        // Math.min is to fix IE which reports 200% sometimes
        //$scope.eventLogo.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });


    };

  });
