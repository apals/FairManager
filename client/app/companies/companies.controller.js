'use strict';


angular.module('fairManagerApp')
  .controller('CompaniesController', function ($scope, socket, CompanyService, Modal) {
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

    $scope.deleteCompany = Modal.confirm.delete(function(company) {
      CompanyService.Company.delete({id: company._id},function(response) {
        angular.forEach($scope.companies, function(u, i) {
          if (u === company) {
            $scope.companies.splice(i, 1);
          }
        });
      });
    });

  });

