(function () {
  'use strict';

  angular.module('stackleAppApp')
    .service('userService', ['$http', userService]);

  function userService($http) {
    var server = 'http://localhost:8080/';
    var getOrgs = function () {
      var url = JSON.parse(localStorage.getItem("profile")).organizations_url;
      $http.get(url).then(function (response) {
        return response;
      }, function error(response) {
        return "error_occured";
      })
    }

    var getSubscribedStacks = function(userid, callback){
      var apiUrl = server + 'api/stack/subscribed/'+ userid;
      $http.get(apiUrl).then(function(response){
        return callback(response.data);
      })
    };

    return {
      getOrgs: getOrgs,
      getSubscribedStacks : getSubscribedStacks
    }
  }
})();
