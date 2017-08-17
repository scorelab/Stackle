(function () {
    'use strict';

    angular.module('stackleAppApp')
        .service('postService', ['$http', postService]);

    function postService($http) {
        var server = 'locahost:8080';

        var getAllPosts = function () {
            var apiurl = server + 'api/posts';

            $http.get(apiurl).then(function (response) {
                return response.data;
            }, function error(error) {
                return error;
            })
        }

        return {
            getAllPosts: getAllPosts
        }
    }

})