'use strict';

angular.module('fairManagerApp')
  .controller('EditCompanyCtrl', function ($scope, CompanyService, $routeParams, $location, $rootScope) {

    $scope.company = {};


    CompanyService.Company.get({id: $routeParams.id}, function (response) {
      $scope.company = response;
      var title = $scope.company.name.charAt(0).toUpperCase() + $scope.company.name.slice(1);
      $rootScope.title = title;
    }, function (error) {
      $scope.company.error = 'There was an error fetching data';
      console.log(error);
    });

    $scope.updateCompany = function (company) {
      CompanyService.Company.update({id: company._id}, company, function () {
        $location.path('/companies');
      }, function (err) {
        $scope.company.error = 'There was an error updating the exhibitor';
        $scope.errorMsg = 'Unable to update the exhibitor. Please check your internet connection and/or your login credentials. Error status code:' + err.status;
      });
    };

  });
