(function() {
  'use strict';

  angular.module('app')

  .directive('statusBlock', [
    function () {
      return {
        scope: {
          status: '='
        },
        templateUrl: 'templates/statusblock.tpl.html',
        controller: 'StatusDirCtrl'
      };
    }
  ])

  .directive('adminBlock', [
    function () {
      return {
        scope: {
          status: '='
        },
        templateUrl: 'templates/adminblock.tpl.html',
        controller: 'StatusDirCtrl'
      };
    }
  ]);

}());
