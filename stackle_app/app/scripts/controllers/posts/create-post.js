(function () {
  'use strict';
  angular
    .module('stackleAppApp')
    .controller('createPostController', CreatePostController);

  function CreatePostController($mdConstant, $scope) {
    // Use common key codes found in $mdConstant.KEY_CODE...
    this.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    this.tags = [];

    $scope.post = {
      title: '',
      description: '',
      repository: '',
      tags: []
    };

  }
})();
