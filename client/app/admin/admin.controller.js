'use strict';


angular.module('fairManagerApp.admin')
  .controller('AdminController', function (User, Modal, $scope, $rootScope) {
    $rootScope.title = 'Admin';

    $scope.users = [];
    $scope.isBusy = true;


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
        $scope.clearFormFields();
        $scope.users.push(response.user);
      }, function (error) {
        if(error.status === 422) {
          $scope.errorMsg = 'Unable to create user. ' + error.data.errors.email.message;
        }
        else {
          $scope.errorMsg = 'Unable to create user. Please check your internet connection';
        }


      });
    };

    $scope.deleteUser = Modal.confirm.delete(function (user) {
      User.delete({id: user._id}, function () {
        $scope.users.splice($scope.users.indexOf(user), 1);
      }, function(error) {
        $scope.error = error.data;
      });
    });

    $scope.clearFormFields = function(){
      $scope.user = {};
      $scope.createUserForm.$setPristine();
    };
  });
