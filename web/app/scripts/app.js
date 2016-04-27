'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */
angular
  .module('webApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'yaru22.md',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/posts/:category', {
        templateUrl: 'views/main.html',
        controller: 'PostListCtrl',
        controllerAs: 'postList'
      })
      .when('/post/:_id', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl',
        controllerAs: 'post'
      })
      .when('/add/', {
        templateUrl: 'views/post.html',
        controller: 'AddCtrl',
        controllerAs: 'add'
      })
      .when('/search/:keyword', {
        templateUrl: 'views/main.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('IndexCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location) {

    $http.get(CONFIG.API.USER)
      .then(function (res) {
        $scope.user = res.data.user;
      })
      .catch(function (error) {
        console.log("error", error);
        throw error;
      });

    $scope.searchPosts = function () {
      if ($scope.searchKeyWord == undefined) {
        return;
      }
      $location.url('/search/' + $scope.searchKeyWord);
    };
  }]);

