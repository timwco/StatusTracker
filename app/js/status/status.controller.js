(function() {
  'use strict';

  angular.module('app')

  .controller('StatusCtrl', ['$scope', 'StatusService', '$rootScope',

    function ($scope, StatusService, $rootScope) {

      $scope.allStats = [];

      $scope.complete = false;

      $rootScope.$on('data:loaded', function () {
        $scope.complete = true;
      });

      StatusService.getStatuses()
        .success( function (data) {
            $scope.allStats = data.results;
      });


    }

  ]);


}());
