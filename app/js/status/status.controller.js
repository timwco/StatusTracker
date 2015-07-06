(function() {
  'use strict';

  angular.module('app')

  .controller('StatusCtrl', ['$scope', 'StatusService',

    function ($scope, StatusService) {

      $scope.allStats = [];

      StatusService.getStatuses()
        .success( function (data) {
            $scope.allStats = data.results;
      });


    }

  ]);


}());
