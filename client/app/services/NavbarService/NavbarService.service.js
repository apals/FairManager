'use strict';

angular.module('fairManagerApp')
  .service('NavbarService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var currentClass = 'inactive';

    this.getCurrentClass = function() {
      return currentClass;
    };

    this.setCurrentClass = function(newClass) {
      currentClass = newClass;
    };

  });
