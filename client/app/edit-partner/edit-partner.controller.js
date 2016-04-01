'use strict';

angular.module('fairManagerApp')
  .controller('EditPartnerCtrl', function ($scope, PartnerService, $routeParams, $location, $rootScope) {
    $scope.partner = {};

    PartnerService.Partner.get({id: $routeParams.id}, function(response) {
      $scope.partner = response;
      var title = $scope.partner.name.charAt(0).toUpperCase() + $scope.partner.name.slice(1);
      $rootScope.title = title;
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
