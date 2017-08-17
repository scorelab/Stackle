(function () {
  'use strict';

  angular.module('stackleAppApp')
    .service('userService', ['$http', userService]);

  function userService($http) {

    var getOrgs = function () {
      var url = JSON.parse(localStorage.getItem("profile")).organizations_url;
      console.log("orgs url is " + url)

      $http.get(url).then(function (response) {
        console.log(response.data);
        return response;
      }, function error(response) {
        return "error_occured";
      })
    }

    return {
      getOrgs: getOrgs
    }
  }
})();
