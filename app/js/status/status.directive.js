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
        controller: ['$scope', 'StatusService', 'GithubService', 'REPO_INFO',
          function ($scope, StatusService, GithubService, REPO_INFO) {
            GithubService.getUserInfo($scope.status).success( function (userInfo) {
              $scope.github = userInfo;
              GithubService.getOpenIssues($scope.status).success( function (userRepos) {
                $scope.open = userRepos.length;
                var num = Math.floor((userRepos.length / REPO_INFO.total) * 100);
                $scope.determinateValue = (num === 0) ? 100 : num;

                $scope.currentStatus = StatusService.checkStatus($scope.status, userInfo, userRepos);

              });
            });


          }
        ]
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
        controller: ['$scope', 'StatusService', 'GithubService', 'REPO_INFO',
          function ($scope, StatusService, GithubService, REPO_INFO) {
            GithubService.getUserInfo($scope.status).success( function (userInfo) {
              $scope.github = userInfo;
              GithubService.getOpenIssues($scope.status).success( function (userRepos) {
                $scope.open = userRepos.length;

                var num = Math.floor((userRepos.length / REPO_INFO.total) * 100);
                $scope.determinateValue = (num === 0) ? 100 : num;

                $scope.currentStatus = StatusService.checkStatus($scope.status, userInfo, userRepos);

              });
            });


          }
        ]
      };

    }

  ]);

}());
