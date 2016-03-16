'use strict';


angular.module('fairManagerApp.admin')
  .controller('AdminController', function (User, Modal, $scope) {

    $scope.users = [];

    User.query(function (response) {
      $scope.users = response;
    }, function (err) {
    });

    $scope.create = function (user) {
      var newUser = new User(user);
      newUser.$save(function (response) {
        user._id = response.id;
        $scope.users.push(user);
      }, function (error) {
        console.log("There was an error creating the user");
      });
    };

    $scope.deleteUser = Modal.confirm.delete(function (user) {
      User.delete({id: user._id}, function (response) {
        $scope.users.splice($scope.users.indexOf(user), 1);
      }, function(error) {
        $scope.error = error.data;
      });
    });
  });
