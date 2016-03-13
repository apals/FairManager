'use strict';

angular.module('fairManagerApp')
  .controller('LoginCtrl', function (Auth, $location, $scope) {
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;

    $scope.login = function (form) {
      this.submitted = true;

      if (form.$valid) {
        console.log("authing..");
        Auth.login({
            email: $scope.login.user.email,
            password: $scope.login.user.password
          })
          .then(() => {
            // Logged in, redirect to home
            $location.path('/companies');
          })
          .catch(err => {
            $scope.errors.other = err.message;
          });
      }
    }

  });
