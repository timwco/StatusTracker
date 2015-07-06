(function() {
  'use strict';

  angular.module('github', ['config'])

  .service('GithubService', ['$http', 'ConfigService',

    function ($http, ConfigService) {

      this.getOpenIssues = function (user) {
        var url = 'http://tiyghwrap.herokuapp.com/repos/' + user.username;
        return $http.get(url);
      };

      this.getUserInfo = function (user) {
        var url = 'http://tiyghwrap.herokuapp.com/user/' + user.username;
        return $http.get(url);
      };

    }

  ]);


}());
