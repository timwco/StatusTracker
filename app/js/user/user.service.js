(function() {
  'use strict';

  angular.module('app')

  .service('UserService', ['$http', 'PARSE', '$cookies', '$state',

    function ($http, PARSE, $cookies, $state) {

      var User = function (opts) {
        this.username = opts.username;
        this.name = opts.name;
        this.password = opts.password;
      };

      var _updateConfig = function (user) {
        PARSE.CONFIG.headers['X-Parse-Session-Token'] = user.sessionToken;
        $state.go('dashboard');
      };

      var _successLogin = function (user) {
        $cookies.put('authToken', user.sessionToken);
        $cookies.putObject('currentUser', user);
        $state.go('dashboard');
      };

      var _successLogout = function () {
        $cookies.remove('authToken');
        $cookies.remove('currentUser');
        PARSE.CONFIG.headers['X-Parse-Session-Token'] = '';
        $state.go('login');
      };

      this.logout = function () {
        _successLogout();
      };

      this.registerUser = function (obj) {
        var x = new User(obj);
        $http.post(PARSE.URL + 'users', x, PARSE.CONFIG);
      };

      this.getUsers = function () {
        return $http.get(PARSE.URL + 'users', PARSE.CONFIG);
      };

      this.login = function (user) {

        $http({
          method: 'GET',
          url: PARSE.URL + 'login',
          headers: PARSE.CONFIG.headers,
          params: user
        }).success( function (data) {
          console.log(data);
          _successLogin(data);
        });

      };

      this.checkStatus = function () {
        var user = $cookies.getObject('currentUser');
        if (user !== undefined) {
          _updateConfig(user);
        } else {
          $state.go('login');
        }
      };


    }

  ]);

}());
