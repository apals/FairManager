'use strict';

angular.module('fairManagerApp')
  .controller('EditPartnerCtrl', function ($scope, PartnerService, ErrorHandlingService, $routeParams, $location, $rootScope, Upload) {
    $scope.partner = {};

    PartnerService.Partner.get({id: $routeParams.id}, function(response) {
      $scope.partner = response;
      var title = $scope.partner.name.charAt(0).toUpperCase() + $scope.partner.name.slice(1);
      $rootScope.title = title;
    }, function(error) {
      $scope.partner.error = 'There was an error fetching data';
      $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'fetch partner data');
    });


/*    $scope.updatePartner = function (partner) {
      PartnerService.Partner.update({id: partner._id}, partner, function () {
        $location.path('/partners');
      }, function(error) {
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'update partner');
      });
    };*/

    $scope.updatePartner = function (partner) {
      var newPartner = {
        name: partner.name,
        logo: partner.logo
      };

      if(partner.logoUrl !== null && partner.logoUrl !== 'null' && !partner.logo) {
        newPartner.logoUrl = partner.logoUrl;
      }

      var upload = Upload.upload({
        method: 'PUT',
        url: '/api/partners/' + partner._id,
        data: newPartner
      });

      upload.then(function () {
        $location.path('/partners');
      }, function (error) {
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'create partner');
      }, function () {
        // Math.min is to fix IE which reports 200% sometimes
        //$scope.partnerLogo.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    };

  });
