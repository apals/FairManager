'use strict';

angular.module('fairManagerApp')
  .controller('PartnerDetailCtrl', function ($scope, PartnerService, ErrorHandlingService, $routeParams) {
    $scope.partner = {};
    $scope.isBusy = true;

    PartnerService.Partner.get({id: $routeParams.id}, function(response) {
      $scope.partner = response;
      $scope.isBusy = false;
      $rootScope.title = 'Partners - ' + $scope.partner.name.charAt(0).toUpperCase() + $scope.partner.name.slice(1);

    }, function(error) {
      $scope.partner.error = ErrorHandlingService.getErrorMessage(error, 'fetch partner details');
      $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'fetch partner details');
      console.log(error);
    });

  });
