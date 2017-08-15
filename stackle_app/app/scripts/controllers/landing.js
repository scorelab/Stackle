(function(){
  'use strict';
  angular
    .module('stackleAppApp')
    .controller('landingController', [ '$scope', 'userService', 'stackService', landingController]);

  function landingController($scope, userService, stackService) {
    $scope.orgs = userService.getOrgs();

    $scope.searchOrg = function(name){
      return stackService.searchStack(name);
    }
  }

})();
