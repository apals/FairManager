'use strict';


angular.module('fairManagerApp.admin')
  .controller('AdminController', function (User, Modal, $scope) {

    $scope.users = [];
    $scope.isBusy = true;

    $scope.hasErrored = false;
    $scope.errorMsg = "";

    var mapping =  {
    'owner': 0,
    'admin': 1,
    'user' : 2
    };

    $scope.priorityOrder = function(userEntry) {
      return mapping[userEntry.role];
    };

    User.query(function (response) {
      $scope.users = response;
      $scope.isBusy = false;
    }, function (err) {
      console.log(err);
    });

    $scope.create = function (user) {
      var newUser = new User(user);
      newUser.$save(function (response) {
        user._id = response.id;
        user.role = response.role;
        $scope.users.push(user);
      }, function (error) {
        $scope.hasErrored = true;
        $scope.errorMsg = "Unable to create user. Please check your internet connection and/or your login credentials.";
      });
    };

    $scope.deleteUser = Modal.confirm.delete(function (user) {
      User.delete({id: user._id}, function () {
        $scope.users.splice($scope.users.indexOf(user), 1);
      }, function(error) {
        $scope.error = error.data;
      });
    });
  });
