'use strict';


angular.module('fairManagerApp')
  .controller('CompaniesController', function ($scope, socket, CompanyService, ErrorHandlingService, Modal) {
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
      CompanyService.Company.delete({id: company._id},function() {
        $scope.companies.splice($scope.companies.indexOf(company), 1);

      }, function(error) {
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'delete company');
      });
    });

  });

