
'use strict';

angular.module('fairManagerApp')
  .controller('EditCompanyCtrl', function ($scope, CompanyService, $routeParams) {

    var company;

    CompanyService.Company.get({id: $routeParams.id}, function (response) {
      $scope.companyName = response.name;
      company = response;
    }, function (error) {
      $scope.companyName = "Error fetching data";
    });


    $scope.updateCompany = function () {
      if (!company) {
        return;
      }

      company.name = $scope.companyName;
      CompanyService.Company.update({id: company._id}, company, function (response) {

      });

    };


  });
