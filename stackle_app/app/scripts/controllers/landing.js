(function () {
  'use strict';
  angular
    .module('stackleAppApp')
    .controller('landingController', ['$scope', 'userService', 'stackService', 'postService', landingController]);

  function landingController($scope, userService, stackService ,postService) {
    $scope.orgs = userService.getOrgs();
    
    postService.getAllPosts(function(data){
      console.log("Getting posts!")
      console.log(data);
      if(data.length!=0){
        $scope.posts = data;
      }else{
        $scope.postError = true;
      }
    })
    
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

    var user_id = JSON.parse(localStorage.getItem("profile")).identities[0].user_id;
    userService.getSubscribedStacks(user_id, function(data){
      console.log(data);
      if(data.length != 0){
        $scope.sub_stacks = data;
      }else{
        $scope.subscribed = false;
      }
    });
    
  }

})();
