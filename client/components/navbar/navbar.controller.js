'use strict';

angular.module('fairManagerApp')
  .controller('NavbarController', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'Exhibitors',
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
      },
      {
        'title': 'App Settings',
        'link': '/appsettings'
      }
    ];
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.hasRole = Auth.hasRole;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function (route) {
      var re = new RegExp(route);
      return $location.url().match(re) !== null;
    };

  });
