'use strict';

angular.module('fairManagerApp')
  .service('UtilService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.splitCamelCase = function (string) {
      return string.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
        return str.toUpperCase();
      });
    };

    return this;
  });
