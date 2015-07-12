(function() {
  'use strict';

  angular.module('app')

  .controller('StatusDirCtrl', ['$scope', 'StatusService', 'GithubService', 'REPO_INFO', '$rootScope',
    function ($scope, StatusService, GithubService, REPO_INFO, $rootScope) {
      GithubService.getUserInfo($scope.status).success( function (userInfo) {
        $scope.github = userInfo;
        GithubService.getOpenIssues($scope.status).success( function (userRepos) {
          $scope.open = userRepos.length;

          var num = Math.floor((userRepos.length / REPO_INFO.total) * 100);
          $scope.determinateValue = (num === 0) ? 100 : num;

          $scope.currentStatus = StatusService.checkStatus($scope.status, userInfo, userRepos);

          $rootScope.$broadcast('data:loaded');

        });
      });
    }
  ]);

}());
