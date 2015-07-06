(function() {
  'use strict';

  angular.module('config', [])

  .service('ConfigService', ['$http',

      function ($http) {

        this.getAppInfo = function () {
          var config = {
            headers: {
             'X-Parse-Application-Id' : 'LOgO7FHaO2c4vAq1OT6YTH9VhYMC0qBnv7wpU92Z',
             'X-Parse-REST-API-Key'  : 'obRIckvModf7518jWNFzHUFvyQrJV4qw4C4klnEM'
            }
          };
          return $http.get('https://api.parse.com/1/classes/App', config);
        };

      }

  ]);

}());
