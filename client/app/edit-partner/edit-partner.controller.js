'use strict';

angular.module('fairManagerApp')
  .controller('EditPartnerCtrl', function ($scope, PartnerService, ErrorHandlingService, $routeParams, $location) {
    $scope.partner = {};

    PartnerService.Partner.get({id: $routeParams.id}, function(response) {
      $scope.partner = response;
      var title = $scope.partner.name.charAt(0).toUpperCase() + $scope.partner.name.slice(1);
      $rootScope.title = title;
    }, function(error) {
      $scope.partner.error = 'There was an error fetching data';
      $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'fetch partner data');
    });


    $scope.updatePartner = function (partner) {
      PartnerService.Partner.update({id: partner._id}, partner, function () {
        $location.path('/partners');
      }, function(error) {
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'update partner');
      });
    };

  });
