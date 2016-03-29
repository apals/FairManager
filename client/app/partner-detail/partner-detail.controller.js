'use strict';

angular.module('fairManagerApp')
  .controller('PartnerDetailCtrl', function ($scope, PartnerService, ErrorHandlingService, $routeParams) {
    $scope.partner = {};
    $scope.isBusy = true;

    PartnerService.Partner.get({id: $routeParams.id}, function(response) {
      $scope.partner = response;
      $scope.isBusy = false;

    }, function(error) {
      $scope.partner.error = ErrorHandlingService.getErrorMessage(error, 'fetch partner details');
      $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'create event');
      console.log(error);
    });

  });
