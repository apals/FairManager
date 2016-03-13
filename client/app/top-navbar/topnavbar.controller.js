'use strict';

angular.module('fairManagerApp')
  .controller('TopNavbarController', function ($scope, $location, NavbarService, Auth) {
  	/*
    $scope.toggleMenu = function () {
      if (NavbarService.getCurrentClass() === "inactive") {
        NavbarService.setCurrentClass("active");
      } else {
        NavbarService.setCurrentClass("inactive");
      }
    }*/

    $scope.menu = [
	    {
	    	'title': 'Companies',
	    	'link': '/companies'
	    },
	    {
	    	'title': 'Events',
	    	'link': '/events'
	    },
	    {
	    	'title': 'Partners',
	    	'link': '/partners'
	    },
	    {
	    	'title': 'Contact',
	    	'link': '/contact'
	    },
	    {
	    	'title': 'Personnel',
	    	'link': '/personnel'
	    }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });
