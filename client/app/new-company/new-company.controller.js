'use strict';

angular.module('fairManagerApp')
  .controller('NewCompanyCtrl', function ($scope, CompanyService, $location, Upload, $timeout) {

    $scope.hasErrored = false;
    $scope.errorMsg = "";

    $scope.addCompany = function (company) {

      if (company) {
        var upload = Upload.upload({
          url: '/api/companies',
          data: company
        });

        upload.then(function (response) {
          $timeout(function () {
            //$scope.eventLogo.result = response.data;
            if (response.status === 201) {
              $location.path('/companies');
            }
          });
        }, function (response) {
          if (response.status > 0) {
            $scope.hasErrored = true;
            $scope.errorMsg = "Unable to create new company. Technical data: " + response.status + ': ' + response.data;
          }
        }, function () {
          // Math.min is to fix IE which reports 200% sometimes
          //$scope.eventLogo.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }

    };

  });
