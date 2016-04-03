'use strict';

angular.module('fairManagerApp')
  .controller('CompanyDetailCtrl', function ($scope, CompanyService, ErrorHandlingService, $routeParams) {
  	$scope.company = {};
  	$scope.isBusy = true;

    CompanyService.Company.get({id: $routeParams.id}, function(response) {
      $scope.company = response;
      $scope.isBusy = false;
    }, function(error) {
      $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'fetch company details');
      $scope.company.error = ErrorHandlingService.getErrorMessage(error, 'fetch company details');
    });

  });
