(function(){
  'use strict';
  angular
    .module('stackleAppApp')
    .controller('landingController', [ '$scope','userService', 'stackService', 'postService', landingController]);

  function landingController($scope, userService, stackService) {
    $scope.orgs = userService.getOrgs();

    $scope.posts = postService.getAllPosts();

    $scope.searchOrg = function searchOrg(name){
      stackService.searchStack(name).then(function(result){
        $scope.result = result;
        console.log($scope.result)
      })
    }

    $scope.orgname='';
  }

})();
