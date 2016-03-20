'use strict';

angular.module('fairManagerApp')
  .controller('EditCompanyCtrl', function ($scope, CompanyService, $routeParams, $location) {

    $scope.company = {};
    CompanyService.Company.get({id: $routeParams.id}, function (response) {
      $scope.company = response;
    }, function (error) {
      $scope.company.error = 'There was an error fetching data';
      console.log(error);
    });

    $scope.updateCompany = function (company) {
      CompanyService.Company.update({id: company._id}, company, function () {
        $location.path('/companies');
      }, function (err) {
        $scope.company.error = 'There was an error updating the exhibitor';
        console.log(err);
      });
    };

  });
