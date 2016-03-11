'use strict';

angular.module('fairManagerApp').controller('NewCompanyCtrl', function ($scope, CompanyService, $location, Upload, $timeout) {

  $scope.addCompany = function () {
    /* if ($scope.companyName) {
       var newCompany = new CompanyService.Companies({name: $scope.companyName});
       newCompany.$save(function (response) {
         $scope.companyName = '';
         $location.path('/companies');
       }, function (error) {
       });
     }
     console.log($scope.picFile);*/

    $scope.picFile.upload = Upload.upload({
      url: '/api/companies',
      data: { name: $scope.companyName, file: $scope.picFile }
    });

    $scope.picFile.upload.then(function (response) {
      $timeout(function () {
        $scope.picFile.result = response.data;
      });
    }, function (response) {
      if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      $scope.picFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
  };
});

//# sourceMappingURL=new-company.controller-compiled.js.map