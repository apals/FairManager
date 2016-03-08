'use strict';

angular.module('fairManagerApp')
  .controller('NavbarController', function ($scope, Auth, NavbarService) {

    this.isLoggedIn = Auth.isLoggedIn;

  });
