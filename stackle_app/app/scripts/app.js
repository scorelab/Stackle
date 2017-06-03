'use strict';

/**
 * @ngdoc overview
 * @name stackleAppApp
 * @description
 * # stackleAppApp
 *
 * Main module of the application.
 */
angular
  .module('stackleAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
