(function(){
	'use strict';

	angular
		.module('stackleApp')
		.directive('toolbar',toolbar);

		function toolbar(){
			return {
				templateUrl: 'app/components/toolbar/toolbar.html',
				controller : toolbarController,
				controllerAs: 'toolbar'
			}
		}

		function toolbarController(auth, store, $location){
			var vm = this;
			vm.login = login;
			vm.logout = logout;
			vm.auth = auth;
			
			function login(){
				auth.signin({},function(profile, token){
					store.set('profile', profile);
					store.set('id_token', token);
					$location.path('/home');
				}, function(err){
					console.log(err);
				});
			}
			
			function logout(){
				store.remove('profile');
				store.remove('id_token');
				auth.signout();
				$location.path('/home');
			}
		} 
})();