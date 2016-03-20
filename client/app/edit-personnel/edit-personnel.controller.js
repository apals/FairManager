'use strict';

angular.module('fairManagerApp')
  .controller('EditPersonnelCtrl', function ($scope, PersonnelService, $routeParams, $location) {
    $scope.personnel = {};
    PersonnelService.Person.get({id: $routeParams.id}, function(response) {
      $scope.personnel = response;
    }, function(error) {
      $scope.personnel.error = 'There was an error fetching data';
      console.log(error);
    });


    $scope.updatePersonnel = function (personnel) {
      PersonnelService.Person.update({id: personnel._id}, personnel, function () {
        $location.path('/personnel');
      }, function(err) {
        console.log('There was an error updating personnel');
        console.log(err);
      });
    };

  });
