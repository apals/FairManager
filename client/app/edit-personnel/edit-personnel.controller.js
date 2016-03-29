'use strict';

angular.module('fairManagerApp')
  .controller('EditPersonnelCtrl', function ($scope, PersonnelService, $routeParams, $location, $rootScope) {
    $scope.personnel = {};

    PersonnelService.Person.get({id: $routeParams.id}, function(response) {
      $scope.personnel = response;
      var title = $scope.personnel.name.charAt(0).toUpperCase() + $scope.personnel.name.slice(1);
      $rootScope.title = title;
    }, function(error) {
      $scope.personnel.error = 'There was an error fetching data';
      $scope.errorMsg = 'Unable to fetch data. Please check your internet connection.' + error.status;
    });


    $scope.updatePersonnel = function (personnel) {
      PersonnelService.Person.update({id: personnel._id}, personnel, function () {
        $location.path('/personnel');
      }, function(err) {
        $scope.errorMsg = 'Unable to update personnel. Please check your internet connection. Error status code: ' + err.status;
      });
    };

  });
