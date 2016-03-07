'use strict';

(function () {

  class CompaniesController {

    constructor($scope, socket, CompanyService) {
      this.CompanyService = CompanyService;
      $scope.companies = [];

      CompanyService.Companies.query(function (response) {
        angular.forEach(response, function (item) {
          if (item.name) {
            $scope.companies.push({item});
          }
        });
        socket.syncUpdates('companies', $scope.companies);
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('companies');
      });
    }



    deleteThing(company) {
      /*Companies.Companiess.remove()*/
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('fairManagerApp')
    .controller('CompaniesController', CompaniesController);

})();
