'use strict';

angular.module('fairManagerApp')
  .controller('PartnerDetailCtrl', function ($scope, PartnerService, $routeParams, $rootScope) {
    $scope.partner = {};
    $scope.isBusy = true;

    PartnerService.Partner.get({id: $routeParams.id}, function(response) {
      $scope.partner = response;
      $scope.isBusy = false;
      $rootScope.title = 'Partners - ' + $scope.partner.name.charAt(0).toUpperCase() + $scope.partner.name.slice(1);

    }, function(error) {
      $scope.partner.error = 'Unable to fetch partner details. Please check your internet connection and/or your login credentials.';
      console.log(error);
    });

  });
