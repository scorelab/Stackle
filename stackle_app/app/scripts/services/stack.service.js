(function () {
  'use strict';

  angular.module('stackleAppApp')
    .service('stackService', ['$http', stackService]);

  function stackService($http) {

    var searchStack = function (name, cb) {
      if (name) {
        var url = "https://api.github.com/orgs/" + name;
        $http.get(url).then(function (result) {
          return cb(result);
        }, function (error) {
          return cb(error);
        });
      } else {
        return "Can't get!";
      }

    };

    var stackExist = function (name, cb) {
      if (name) {
        var url = 'http://localhost:8080/api/org/' + name;
        $http.get(url).then(function (result) {
          // console.log(result.data);
          if (result.data = '[]') {
            return cb(false);
          }
          return cb(true);
        }, function (error) {
          return cb(error);
        });
      }
    };

    var createStack = function (name, username) {
      var url = "https://api.github.com/orgs/{{name}}/members";

      $http.get(url).then(function (response) {
        var members = JSON.parse(response.data);
        for (var member in members) {
          if (member.login === name) {
            return "you are a member";
          } else {
            return "you are not a member";
          }
        }
      }, function error(response) {
        return "error occured!";
      });
    };

    var subscribeStack = function (userid, stackname, callback) {
      var apiUrl = 'http://localhost:8080/api/subscribe';
      var data = {
        uid: userid,
        stack_name: stackname
      };
      $http.post(apiUrl, data).then(function (response) {
        callback(response);
      }, function (error) {
        callback(error);
      });
    };

    return {
      searchStack: searchStack,
      createStack: createStack,
      stackExist: stackExist,
      subscribeStack: subscribeStack
    };

  }
})();
