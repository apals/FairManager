
'use strict';

angular.module('fairManagerApp')
  .controller('EditCompanyCtrl', function ($scope, CompanyService, $routeParams, $location) {

    $scope.company = {};
    CompanyService.Company.get({id: $routeParams.id}, function(response) {
      $scope.company = response;
    }, function(error) {
      $scope.company.error = "There was an error fetching data";
    });

    $scope.updateCompany = function (company) {
      if (!company) {
        return;
      }

      CompanyService.Company.update({id: company._id}, company, function (response) {
        $location.path('/companies');
      }, function(err) {
      });

    };


  });
