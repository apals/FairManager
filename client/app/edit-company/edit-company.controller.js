'use strict';

angular.module('fairManagerApp')
  .controller('EditCompanyCtrl', function ($scope, CompanyService, $routeParams) {

    $scope.company = {};
    CompanyService.Company.get({id: $routeParams.id}, function(response) {
      $scope.company = response;
    }, function(error) {
      $scope.company = {};
    });


    $scope.updateCompany = function () {
      if (!$scope.company) {
        return;
      }

      CompanyService.Company.update({id: $scope.company._id}, $scope.company, function (response) {

      });

    };


  });
