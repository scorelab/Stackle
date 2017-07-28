(function(){
  'use strict';
  angular
    .module('stackleAppApp')
    .controller('landingController', [ '$scope', 'userService', landingController]);

  function landingController($scope, userService) {
    $scope.orgs = userService.getOrgs();
  }

})();
