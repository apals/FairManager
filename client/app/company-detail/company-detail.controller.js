'use strict';

angular.module('fairManagerApp')
  .controller('CompanyDetailCtrl', function ($scope, CompanyService, $routeParams) {
  	$scope.company = {};
  	$scope.isBusy = true;

    CompanyService.Company.get({id: $routeParams.id}, function(response) {
      $scope.company = response;
      $scope.isBusy = false;
    }, function() {
      $scope.company.error = 'Unable to fetch company details. Please check your internet connection and/or your login credentials.';
    });

  });
