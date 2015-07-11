(function() {

  'use strict';

  angular.module('app', ['ui.router', 'ngMaterial', 'ngCookies', 'github'])

  .constant('PARSE', {
    URL: 'https://api.parse.com/1/',
    CONFIG: {
      headers: {
       'X-Parse-Application-Id' : 'LOgO7FHaO2c4vAq1OT6YTH9VhYMC0qBnv7wpU92Z',
       'X-Parse-REST-API-Key'  : 'obRIckvModf7518jWNFzHUFvyQrJV4qw4C4klnEM'
      }
    }
  })

  .constant('REPO_INFO', {
    total: 22,
    required: ['3', '7', '10', '12', '15', '19', '22']
  })

.config( ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',

    function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {

      $mdThemingProvider.theme('default')
        .primaryPalette('green')
        .accentPalette('orange')
        .warnPalette('red');

      $urlRouterProvider.otherwise('/dashboard');

      $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'templates/dashboard.tpl.html',
          controller: 'StatusCtrl'
        })

        .state('info', {
          url: '/info',
          templateUrl: 'templates/info.tpl.html'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.tpl.html',
          controller: 'LoginCtrl'
        })

        .state('logout', {
          url: '/logout',
          controller: ['UserService', function (UserService) {
            UserService.logout();
          }]
        })

        .state('admin', {
          url: '/admin',
          templateUrl: 'templates/admin.tpl.html',
          controller: 'StatusCtrl'
        })

    }

  ])

  .run(['$rootScope', 'UserService',

    function ($rootScope, UserService) {

      $rootScope.$on('$stateChangeSuccess', function () {
        UserService.checkStatus();
      });

    }

  ]);

}());
