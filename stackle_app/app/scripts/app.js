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
        templateUrl : 'views/home.html'
      })
      .state('profile',{
        url :'/profile',
        templateUrl : 'views/profile.html',
        controller : 'profileController as user'
      })
      .state('landing',{
        url : '/landing',
        templateUrl : 'views/landing.html',
        controller : 'landingController'
      })
      .state('main',{
        url : '/main',
        templateUrl : 'views/main.html',
        controller : 'MainCtrl'
      })
      .state('createPost', {
        url : '/post/createPost',
        templateUrl : 'views/posts/create-post.html',
        controller : 'createPostController'
      })
      .state('viewPost', {
        url : '/post/viewPost',
        templateUrl : 'views/posts/view-post.html',
        controller : 'viewPostController'
      })
      .state('otherwise',{
        url : '/#!/*path',
        templateUrl : '404.html'
      })
      .state('staticLanding', {
        url: '',
        templateUrl: 'views/static-landing.html'
      })
  });
