'use strict';

angular.module('stackleAppApp')
  .controller('profileController', function ($http, $scope, auth) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.profile = JSON.parse(localStorage.getItem("profile"));

    $scope.auth = auth;

  });
