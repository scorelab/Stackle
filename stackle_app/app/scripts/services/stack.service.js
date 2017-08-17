(function () {
  'use strict';

  angular.module('stackleAppApp')
    .service('stackService', ['$http', stackService]);

  function stackService($http) {

    var searchStack = function (name) {
      if (name) {
        var url = "https://api.github.com/orgs/" + name;

        console.log("Searching org :" + name);

        $http.get(url).then(function success(response) {
          return response;
        }, function error(response) {
          return "error occured";
        })
      }else{
        return "Can't get!";
      }
      
    }

    var createStack = function (name, username) {
      var url = "https://api.github.com/orgs/{{name}}/members";

      $http.get(url).then(function (response) {
        var members = JSON.parse(response.data);
        for (var member in members) {
          if (member.login == name) {
            return "you are a member";
          } else {
            return "you are not a member";
          }
        }
      }, function error(response) {
        return "error occured!"
      })
    }

    return {
      searchStack: searchStack,
      createStack: createStack
    }

  }
})();
