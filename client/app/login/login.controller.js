'use strict';
/*
 class LoginController {
 constructor(Auth, $location) {
 this.user = {};
 this.errors = {};
 this.submitted = false;

 this.Auth = Auth;
 this.$location = $location;
 }

 login(form) {
 this.submitted = true;

 if (form.$valid) {
 console.log("authing..");
 this.Auth.login({
 email: this.user.email,
 password: this.user.password
 })
 .then(() => {
 // Logged in, redirect to home
 this.$location.path('/companies');
 })
 .catch(err => {
 this.errors.other = err.message;
 });
 }
 }
 }*/

angular.module('fairManagerApp')
  .controller('LoginCtrl', function (Auth, $location, $scope) {
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;

    $scope.login = function (form) {
      this.submitted = true;

      if (form.$valid) {
        Auth.login({
            email: $scope.login.user.email,
            password: $scope.login.user.password
          })
          .then(() => {
            // Logged in, redirect to home
            //TODO: redirect to where user came from
            $location.path('/companies');
          })
          .catch(err => {
            $scope.errors.other = err.message;
          });
      }
    }

  });
