'use strict';

angular.module('fairManagerApp')
  .controller('EditCompanyCtrl', function ($scope, CompanyService, ErrorHandlingService, $routeParams, $location, $rootScope, Upload) {

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
      var newCompany = {
        name: company.name,
        logo: company.logo,
        banner: company.banner,
        contactEmail: company.contactEmail
      };

      if(company.logoUrl !== null && company.logoUrl !== 'null' && !company.logo) {
        newCompany.logoUrl = company.logoUrl;
      }
      if(company.bannerUrl !== null && company.bannerUrl !== 'null' && !company.banner){
        newCompany.bannerUrl = company.bannerUrl;
      }

      var upload = Upload.upload({
        method: 'PUT',
        url: '/api/companies/' + company._id,
        data: newCompany
      });

      upload.then(function () {
        $location.path('/companies');
      }, function (error) {
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'create exhibitor');
      }, function () {
        // Math.min is to fix IE which reports 200% sometimes
        //$scope.eventLogo.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    };

  });
