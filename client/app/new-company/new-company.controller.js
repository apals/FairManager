'use strict';

angular.module('fairManagerApp')
  .controller('NewCompanyCtrl', function ($scope, CompanyService, $location, Upload, $timeout) {

    $scope.addCompany = function () {

      if ($scope.picFile) {
        $scope.picFile.upload = Upload.upload({
          url: '/api/companies',
          data: {
            name: $scope.companyName,
            info: $scope.companyInfo,
            file: $scope.picFile}
        });

        $scope.picFile.upload.then(function (response) {
          $timeout(function () {
            $scope.picFile.result = response.data;
            if (response.status === 201) {
              $location.path('/companies');
            }
          });
        }, function (response) {
          console.log("other one" + response);
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          $scope.picFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      } else {
        var newCompany = new CompanyService.Companies({name: $scope.companyName, info: $scope.companyInfo});
        newCompany.$save(function (response) {
          $location.path('/companies');
        }, function (error) {
        });
      }

    };

  });
