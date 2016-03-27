'use strict';

angular.module('fairManagerApp')
  .controller('LoginCtrl', function (Auth, $location, $scope, $rootScope, LoginRedirectService) {
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;
    $rootScope.title = 'Fair Manager';

    $scope.login = function (form) {
      this.submitted = true;

      if (form.$valid) {
        Auth.login({
            email: $scope.login.user.email,
            password: $scope.login.user.password
          })
          .then(() => {
            // Logged in, redirect to where user came from
            LoginRedirectService.redirectMe();
          })
          .catch(err => {
            $scope.errors.other = err.message;
          });
      }
    };

  });
