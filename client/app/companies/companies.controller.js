'use strict';

(function () {

  class CompaniesController {

    constructor($scope, socket, CompanyService) {
      this.CompanyService = CompanyService;
      $scope.companies = [];

      CompanyService.Companies.query(function (response) {
        angular.forEach(response, function (item) {
          if (item.name) {
            $scope.companies.push({name: item.name});
          }
        });
        socket.syncUpdates('companies', $scope.companies);
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('companies');
      });
    }

    addCompany() {
      if (this.company) {
        var newCompany = new this.CompanyService.Companies({name: this.company});
        newCompany.$save();
        this.company = '';
      }
    }

    deleteThing(company) {
      /*Companies.Companiess.remove()*/
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('fairManagerApp')
    .controller('CompaniesController', CompaniesController);

})();
