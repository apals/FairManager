'use strict';

angular.module('fairManagerApp')
  .controller('CompanyDetailCtrl', function ($scope, CompanyService, $routeParams, $rootScope) {
  	$scope.company = {};
  	$scope.isBusy = true;

    CompanyService.Company.get({id: $routeParams.id}, function(response) {
      $scope.company = response;
      $scope.isBusy = false;
      var title = $scope.company.name.charAt(0).toUpperCase() + $scope.company.name.slice(1);
      $rootScope.title = title;
    }, function() {
      $scope.company.error = 'Unable to fetch company details. Please check your internet connection and/or your login credentials.';
    });

  });
