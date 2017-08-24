(function () {
  'use strict';
  angular
    .module('stackleAppApp')
    .controller('landingController', ['$scope', 'userService', 'stackService', 'postService', landingController]);

  function landingController($scope, userService, stackService ,postService) {
    $scope.user_id = JSON.parse(localStorage.getItem("profile")).identities[0].user_id;
    $scope.orgs = userService.getOrgs();
    $scope.org_post = false;
    
    postService.getAllPosts(function(data){
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

    $scope.subscribe = function(user_id, org_name){
      stackService.subscribeStack(user_id, org_name, function(data){
        $scope.submessage = data;
        console.log($scope.submessage);
      })
    };

    
    userService.getSubscribedStacks($scope.user_id, function(data){
      if(data.length != 0){
        $scope.sub_stacks = data;
      }else{
        $scope.subscribed = false;
      }
    });
    
    $scope.getOrgPosts = function(org_name){
      postService.getOrgPosts(org_name , function(res){
        console.log(res);
        $scope.org_post = false;
        $scope.org_posts = res;
        $scope.org_post = true;
      })
    };

  }

})();
