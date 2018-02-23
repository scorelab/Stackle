(function () {
  'use strict';
  angular
      .module('stackleAppApp')
      .controller('viewPostController', ['$scope', 'postService', ViewPostController]);

  function ViewPostController ($scope, postService) {
    // $scope.title = "This works!";
    postService.getPost('594e13c3ed47d406c47174ee', function (data){
        
        if(data._id){
            $scope.post = data;
        }else{
            $scope.error = true;
        }
    })

    $scope.comment = '';
    

  }
})();