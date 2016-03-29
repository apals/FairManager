'use strict';

angular.module('fairManagerApp')
  .controller('EditCompanyCtrl', function ($scope, CompanyService, ErrorHandlingService, $routeParams, $location) {

    $scope.company = {};


    CompanyService.Company.get({id: $routeParams.id}, function (response) {
      $scope.company = response;
    }, function (error) {
      $scope.company.error = ErrorHandlingService.getErrorMessage(error, 'fetch company data');
      console.log(error);
    });

    $scope.updateCompany = function (company) {
      CompanyService.Company.update({id: company._id}, company, function () {
        $location.path('/companies');
      }, function (error) {
        $scope.company.error = 'There was an error updating the exhibitor';
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'update exhibitor');
      });
    };

  });
