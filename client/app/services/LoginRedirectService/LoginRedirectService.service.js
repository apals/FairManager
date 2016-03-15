'use strict';

angular.module('fairManagerApp')
  .service('LoginRedirectService', function ($location) {

    this.redirectPath = '/companies';

    this.setRedirectPath = function (path) {
      this.redirectPath = path;
    };

    this.redirect = function () {
      $location.path(this.redirectPath);
    }

    return this;

  });
