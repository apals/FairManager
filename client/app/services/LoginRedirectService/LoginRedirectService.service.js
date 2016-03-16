'use strict';

angular.module('fairManagerApp')
  .service('LoginRedirectService', function ($location) {

    this.redirectPath = '/companies';

    this.setRedirectPath = function (path) {
      this.redirectPath = path;
    };

    this.redirectMe = function () {
      $location.path(this.redirectPath);
    };

    return this;

  });
