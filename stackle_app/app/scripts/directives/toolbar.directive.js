(function(){
    'use strict';

    angular
        .module('stackleAppApp')
        .directive('toolbar',toolbar);

        function toolbar(){
            return {
                templateUrl: 'views/toolbar.html',
                controller : toolbarController,
                controllerAs: 'toolbar'
            };
        }

        function toolbarController(auth, store, $location){
            var vm = this;
            vm.login = login;
            vm.logout = logout;
            vm.auth = auth;

            //check if the user is logged in or not
            function isLoggedIn(){
              if(store.get('id_token'))
                return true;

              return false;
            }

            vm.isAuthenticated = isLoggedIn();

            function login(){
                auth.signin({},function(profile, token){
                    store.set('profile', profile);
                    store.set('id_token', token);
                    $location.path('/landing');
                    vm.isAuthenticated = true;
                }, function(err){
                    console.log(err);
                });
            }

            function logout(){
                vm.isAuthenticated = false;
                store.remove('profile');
                store.remove('id_token');
                auth.signout();
                $location.path('/home');
            }

        }
})();
