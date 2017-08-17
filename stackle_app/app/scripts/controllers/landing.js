(function () {
  'use strict';
  angular
    .module('stackleAppApp')
    .controller('landingController', ['$scope', 'userService', 'stackService', 'postService', landingController]);

  function landingController($scope, userService, stackService ,postService) {
    $scope.orgs = userService.getOrgs();
    
    $scope.getPosts = function(){
      postService.getAllPosts('hello' , function(res){
        console.log(res);
        $scope.posts = res;
      })
    }

    $scope.getPosts();
    
    // $scope.posts = postService.getAllPosts();
    $scope.searched = false;

    $scope.searchOrg = function (name) {
      
      stackService.searchStack(name, function(res) {
        $scope.searched = false;
        $scope.org_name = res.data.name;
        $scope.description = res.data.description;
        $scope.num_repos = res.data.public_repos;
        $scope.repo_url = res.data.repos_url;
        $scope.logo_url = res.data.avatar_url;

        $scope.ifEx = stackService.stackExist($scope.org_name);
        $scope.searched = true;
      })
    }
    $scope.orgname = '';
  }

})();
