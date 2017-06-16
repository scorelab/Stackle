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
    'ngTouch',
    'ngMaterial',
    'auth0',
    'angular-storage',
    'angular-jwt',
    'ui.router'
  ])
  .config(function ($routeProvider,
                    $provide,
                    authProvider,
                    $urlRouterProvider,
                    $stateProvider,
                    $httpProvider,
                    jwtInterceptorProvider,
                    $mdIconProvider) {

    authProvider.init({
      domain : 'psnmissaka.au.auth0.com',
      clientID : 'f6ewsNvcnhe8ODntv_FAD_lW_YPvxN5X'
    });

    $mdIconProvider
           .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
           .defaultIconSet('img/icons/sets/core-icons.svg', 24);

    $stateProvider
      .state('home',{
        url : '/home',
        templateUrl : 'app/views/home.html'
      })
      .state('profile',{
        url :'/profile',
        templateUrl : 'app/views/profile.html',
        controller : 'profileController as user'
      })
      .state('landing',{
        url : '/landing',
        templateUrl : 'app/views/landing.html',
        controller : 'landingController as home'
      });

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
