'use strict';

angular.module('fairManagerApp')
  .controller('CompanyDetailCtrl', function ($scope, CompanyService, $routeParams) {
    CompanyService.Company.get({id: $routeParams.id}, function(response) {
      $scope.companyName = response.name;
    }, function(error) {
      $scope.companyName = "Error fetching data";
    });
  });
