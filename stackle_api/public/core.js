// angular code starts here

var stackleApp = angular.module('stackleApp',[]); //created the app module

stackleApp.controller('mainController', function($scope,$http){

	$scope.message = "Login to stackleapp";

	$http.get('api/login')
		.sucess(function(data){
			$scope.message = data;
			console.log(data);
		})
		.error(function(data){
			console.log('error',_data);
		})
});