'use strict';

angular.module('fairManagerApp')
  .service('NavbarService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var currentClass = 'inactive';

    this.getCurrentClass = function() {
      console.log("getcurerntclas" + currentClass);
      return currentClass;
    };

    this.setCurrentClass = function(newClass) {
      console.log("new class: " + newClass);
      currentClass = newClass;
    };

  });
