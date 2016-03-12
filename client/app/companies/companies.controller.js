'use strict';


angular.module('fairManagerApp')
  .controller('CompaniesController', function ($scope, socket, CompanyService) {
    $scope.companies = [];

    CompanyService.Companies.query(function (response) {
      angular.forEach(response, function (item) {
        if (item.name) {
          $scope.companies.push(item);
        }
      });
      socket.syncUpdates('companies', $scope.companies);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('companies');
    });


    $scope.deleteCompany = function(company) {
      CompanyService.Company.delete({id: company._id}, function(response) {

      });
    }
  })
  .directive('confirm', [function () {
        return {
            priority: 100,
            restrict: 'A',
            link: {
                pre: function (scope, element, attrs) {
                    var msg = attrs.confirm || "Are you sure?";
                    console.log("asd");
                    element.bind('click', function (event) {
                        if (!confirm(msg)) {
                            event.stopImmediatePropagation();
                            event.preventDefault;
                        }
                    });
                }
            }
        };
    }]);

