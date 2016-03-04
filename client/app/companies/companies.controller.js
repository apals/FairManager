'use strict';

(function () {

  class CompaniesController {

    constructor($scope, socket, Companies) {
      this.Companies = Companies;
      this.companies = [];
      $scope.companies = [];

      Companies.Companiess.query(function (response) {
        angular.forEach(response, function (item) {
          if (item.name) {
            $scope.companies.push({name: item.name});
          }
        });
        socket.syncUpdates('companies', $scope.companies);
        /*socket.syncUpdates('companies', $scope.companies, function(event, item, object) {
          $scope.chats = item;  // item contains the updated array
        });*/
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('companies');
      });
    }

    addThing() {
      if (this.company) {
        var newCompany = new this.Companies.Companiess({name: this.company});
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
