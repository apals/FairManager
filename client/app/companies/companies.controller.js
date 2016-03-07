'use strict';


angular.module('fairManagerApp')
  .controller('CompaniesController', function ($scope, socket, CompanyService, $routeParams) {
    $scope.companies = [];

    CompanyService.Companies.query(function (response) {
      angular.forEach(response, function (item) {
        if (item.name) {
          $scope.companies.push(item);
        }
      });
      socket.syncUpdates('companies', $scope.companies);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('companies');
    });


    $scope.deleteCompany = function(company) {
      CompanyService.Company.delete({id: company._id}, function(response) {
        
      });
    }
  });

