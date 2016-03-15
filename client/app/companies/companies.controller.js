'use strict';


angular.module('fairManagerApp')
  .controller('CompaniesController', function ($scope, socket, CompanyService, Modal) {
    $scope.companies = [];
    $scope.isBusy = true;

    CompanyService.Companies.query(function (response) {
      $scope.companies = response;
      $scope.isBusy = false;
      socket.syncUpdates('companies', $scope.companies);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('companies');
    });

    $scope.delete = Modal.confirm.delete(function(company) {
      CompanyService.Company.delete({id: company._id},function(response) {
        angular.forEach($scope.companies, function(u, i) {
          if (u === company) {
            $scope.companies.splice(i, 1);
          }
        });
      });
    });

  });

