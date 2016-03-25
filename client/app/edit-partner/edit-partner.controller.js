'use strict';

angular.module('fairManagerApp')
  .controller('EditPartnerCtrl', function ($scope, PartnerService, $routeParams, $location) {
    $scope.partner = {};

    PartnerService.Partner.get({id: $routeParams.id}, function(response) {
      $scope.partner = response;
    }, function(error) {
      $scope.partner.error = 'There was an error fetching data';
      $scope.errorMsg = 'Unable to fetch partner data. Error status code: ' + error.status;
    });


    $scope.updatePartner = function (partner) {
      PartnerService.Partner.update({id: partner._id}, partner, function () {
        $location.path('/partners');
      }, function(err) {
        $scope.errorMsg = 'Unable to update partner. Error status code: ' + err.status;
      });
    };

  });
