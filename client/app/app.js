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
    'angular-loading-bar',
    'angularUtils.directives.dirPagination',
    'ngAnimate'
  ])
  .run(function ($rootScope, $location, Auth, LoginRedirectService) {

    // register listener to watch route changes
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      console.log("I really just want to try travis");
      Auth.isLoggedIn(function (res) {
        if (!res) {
          // no logged user, we should be going to #login
          if (next.templateUrl == "app/login/login.html") {
          } else {
            if ($location.path() !== '/login') {
              //Never set redirect back to login
              LoginRedirectService.setRedirectPath($location.path());
            }
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
