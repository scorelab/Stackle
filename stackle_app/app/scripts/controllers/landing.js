(function () {
  'use strict';
  angular
    .module('stackleAppApp')
    .controller('landingController', ['$scope', 'userService', 'stackService', landingController]);

  function landingController($scope, userService, stackService) {
    $scope.orgs = userService.getOrgs();

    // $scope.posts = postService.getAllPosts();

    // $scope.searchOrg = function searchOrg(name){
    //   stackService.searchStack(name).then(function(result){
    //     $scope.result = result;
    //     console.log($scope.result)
    //   })
    // }

    $scope.searchOrg = function (name) {
      stackService.searchStack(name, function(res) {
        $scope.org_name = res.data.name;
        $scope.description = res.data.description;
        $scope.num_repos = res.data.public_repos;
        $scope.repo_url = res.data.repos_url;
        $scope.logo_url = res.data.avatar_url;
      })
    }
    $scope.orgname = '';
  }

})();
