'use strict';

angular.module('fairManagerApp')
  .controller('PartnerDetailCtrl', function ($scope, PartnerService, $routeParams) {
    $scope.partner = {};
    PartnerService.Partner.get({id: $routeParams.id}, function(response) {
      $scope.partner = response;
    }, function(error) {
      $scope.partner.error = "There was an error fetching data";
    });

  });
