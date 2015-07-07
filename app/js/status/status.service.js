(function() {
  'use strict';

  angular.module('app')

  .service('StatusService', ['$http', 'PARSE', 'TOTAL_REPOS',

    function ($http, PARSE, TOTAL_REPOS) {

      var Status = function (opts) {
        this.ACL = opts.ACL;
        this.user = opts.user;
        this.willGraduate = true;
        this.tardies = 0;
        this.partial = 0;
        this.absent = 0;
      };

      this.checkStatus = function (status, user, repos) {

        var info = {};

        if (status.willGraduate) {
          var open = repos.length;
          var percentClosed = Math.floor((open / TOTAL_REPOS) * 100);

          if(percentClosed > 80) {
            info.message = 'Based on your current status, you will be graduating on time.';
            info.status = 'Satisfactory';
            info.label = 'default';
          } else {
            info.message = 'Based on your current status, in order to graduate on time, you need to close a few more assignments, and prove that you understand the material. We suggest, you meet with your instructor to come up with a plan to complete your missing work.';
            info.status = 'Pending';
            info.label = 'accent';
          }

        } else {
          info.message = 'Based on your current status, you will be unable to graduate on time. If you have any further questions, please speak with your instructor or campus director.';
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
