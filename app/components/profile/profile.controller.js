(function(){
	'use strict';

	angular
		.module('stackleApp')
		.controller('profileController',profileController);

	function profileController($http){
		var vm=this;

		vm.message = 'Helllo';
	}
})();