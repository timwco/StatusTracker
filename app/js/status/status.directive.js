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
        controller: ['$scope', 'StatusService', 'GithubService', 'TOTAL_REPOS',
          function ($scope, StatusService, GithubService, TOTAL_REPOS) {
            GithubService.getUserInfo($scope.status).success( function (userInfo) {
              $scope.github = userInfo;
              GithubService.getOpenIssues($scope.status).success( function (userRepos) {
                $scope.open = userRepos.length;
                var num = Math.floor((userRepos.length / TOTAL_REPOS) * 100);
                $scope.determinateValue = (num === 0) ? 100 : num;

                StatusService.getAppInfo().success( function (app) {
                  $scope.currentStatus = StatusService.checkStatus($scope.status, userInfo, userRepos, app.results[0]);
                });

              });
            });


          }
        ]
      };

    }

  ]);

}());
