'use strict';

angular.module('fairManagerApp')
  .controller('CompanyDetailCtrl', function ($scope, CompanyService, $routeParams) {
  	$scope.company = {};
    CompanyService.Company.get({id: $routeParams.id}, function(response) {
      $scope.company = response;
    }, function() {
      $scope.company.error = 'There was an error fetching data';
    });

  });
