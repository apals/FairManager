'use strict';

angular.module('fairManagerApp')
  .controller('NewCompanyCtrl', function ($scope, CompanyService, $location) {

    $scope.addCompany = function() {
      if ($scope.companyName) {
        var newCompany = new CompanyService.Companies({name: $scope.companyName});
        newCompany.$save(function(response) {
          $scope.companyName = '';
          $location.path('/companies');
        }, function(error) {

        });
      }
    }
  });
