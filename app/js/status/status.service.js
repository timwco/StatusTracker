(function() {
  'use strict';

  angular.module('app')

  .service('StatusService', ['$http', 'PARSE', 'TOTAL_REPOS', 'ConfigService',

    function ($http, PARSE, TOTAL_REPOS, ConfigService) {

      var Status = function (opts) {
        this.ACL = opts.ACL;
        this.user = opts.user;
        this.willGraduate = true;
        this.tardies = 0;
        this.partial = 0;
        this.absent = 0;
      };

      this.getAppInfo = function () {
        return ConfigService.getAppInfo();
      };

      this.checkStatus = function (status, user, repos, app) {

        var info = {};

        if (status.willGraduate) {
          var open = repos.length;
          var percentClosed = Math.floor((open / TOTAL_REPOS) * 100);

          if(percentClosed > 80) {
            info.message = app.messageComplete;
            info.status = 'Satisfactory';
            info.label = 'default';
          } else {
            info.message = app.messagePending;
            info.status = 'Pending';
            info.label = 'accent';
          }

        } else {
          info.message = app.messageIncomplete;
          info.status = 'Unsatisfactory';
          info.label = 'warn';
        }

        return info;

      };

      this.getStatuses = function () {
        return $http.get(PARSE.URL + 'classes/Status', PARSE.CONFIG);
      };


    }

  ]);

}());
