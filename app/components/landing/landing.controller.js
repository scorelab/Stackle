(function(){
	'use strict';

	angular
		.module('stackleApp')
		.controller('landingController', landingController);

	function landingController($http){
		var vm=this;

		vm.message = 'Helllo';
	}
})();