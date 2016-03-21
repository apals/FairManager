'use strict';

angular.module('fairManagerApp')
  .controller('CompanyDetailCtrl', function ($scope, CompanyService, $routeParams) {
  	$scope.company = {};
    CompanyService.Company.get({id: $routeParams.id}, function(response) {
      $scope.company = response;
    }, function() {
      $scope.company.error = 'Unable to fetch company details. Please check your internet connection and/or your login credentials.';
    });

  });
