(function () {
    'use strict';

    angular.module('stackleAppApp')
        .service('postService', ['$http', postService]);

    function postService($http) {
        var server = 'http://localhost:8080/';

        var getAllPosts = function () {
            var apiurl = server + 'api/posts';

            $http.get(apiurl).then(function (response) {
                return response.data;
            }, function error(error) {
                return error;
            })
        }

        var getPost = function (postid, callback) {
            var apiUrl = server + 'api/post/' + postid;

            $http.get(apiUrl).then(function(response){
                callback(response.data);
            });
        }

        return {
            getAllPosts: getAllPosts,
            getPost : getPost
        }
    }

})();