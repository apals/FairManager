'use strict';

/*(function () {

 class AdminController {
 constructor(User, Modal, $scope) {
 // Use the User $resource to fetch all users
 this.user = User;
 this.users = User.query();
 }

 create(user) {
 var newUser = new this.user(user);
 console.log("creating user");
 var that = this;
 newUser.$save(function (response) {
 that.users.push(user);
 }, function (error) {
 this.create.error = "There was an error creating the user";
 });
 }

 deletes = this.modala.confirm.delete(function (user) {
 this.user.delete({id: user._id}, function (response) {
 this.users.splice(this.users.indexOf(user), 1);
 });
 });
 }
 */
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
