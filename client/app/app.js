'use strict';

angular.module('fairManagerApp', [
    'fairManagerApp.auth',
    'fairManagerApp.admin',
    'fairManagerApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngResource',
    'ngRoute',
    'btford.socket-io',
    'validation.match',
    'ngFileUpload',
    'ui.bootstrap',
    'angular-loading-bar'
  ])
  .run(function ($rootScope, $location, Auth, $route) {

    // register listener to watch route changes
    $rootScope.$on("$routeChangeStart", function (event, next, current) {

      Auth.isLoggedIn(function (res) {
        if (!res) {
          // no logged user, we should be going to #login
          if (next.templateUrl == "app/login/login.html") {
          } else {
            $location.path("/login");
          }
        } else {
          if (next.templateUrl == "app/login/login.html") {
            $location.path("/companies");
          }
        }
      })
    });
  })
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/companies'
      });

    $locationProvider.html5Mode(true);
  });
