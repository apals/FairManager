'use strict';

angular.module('fairManagerApp')
  .controller('PartnerDetailCtrl', function ($scope, PartnerService, $routeParams) {
    $scope.partner = {};
    $scope.isBusy = true;

    PartnerService.Partner.get({id: $routeParams.id}, function(response) {
      $scope.partner = response;
      $scope.isBusy = false;
      
    }, function(error) {
      $scope.partner.error = 'Unable to fetch partner details. Please check your internet connection and/or your login credentials.';
      console.log(error);
    });

  });
