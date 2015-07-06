(function() {
  'use strict';


  angular.module('app')

  .controller('LoginCtrl', ['$scope', 'UserService',

    function ($scope, UserService) {

      $scope.user = {};

      $scope.login = function (user) {
        UserService.login(user);
      };

    }

  ]);

}());
