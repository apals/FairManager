'use strict';

angular.module('fairManagerApp')
  .controller('EditCompanyCtrl', function ($scope, CompanyService, ErrorHandlingService, $routeParams, $location, $rootScope) {

    $scope.company = {};


    CompanyService.Company.get({id: $routeParams.id}, function (response) {
      $scope.company = response;
      var title = $scope.company.name.charAt(0).toUpperCase() + $scope.company.name.slice(1);
      $rootScope.title = title;
    }, function (error) {
      $scope.company.error = ErrorHandlingService.getErrorMessage(error, 'fetch company data');
      console.log(error);
    });

    $scope.clearLogo = function (company) {
      company.logo = null;
      company.logoUrl = null;
    };

    $scope.clearBanner = function (company) {
      company.banner = null;
      company.bannerUrl = null;
    };

    $scope.updateCompany = function (company) {

      console.log(company);

      CompanyService.Company.update({id: company._id}, company, function () {
        $location.path('/companies');
      }, function (error) {
        $scope.company.error = 'There was an error updating the exhibitor';
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'update exhibitor');
      });
    };

  });
