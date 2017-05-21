'use strict';

angular
	.module('stackleApp',['auth0','angular-storage','angular-jwt','ngMaterial','ui.router'])
	.config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider){

		authProvider.init({
			domain : 'psnmissaka.au.auth0.com',
			clientID : 'f6ewsNvcnhe8ODntv_FAD_lW_YPvxN5X'
		});

		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home',{
				url : '/home',
				templateUrl : 'app/components/home/home.html'
			})
			.state('profile',{
				url :'/profile',
				templateUrl : 'app/components/profile/profile.html',
				controller : 'profileController as user'
			});
	})

