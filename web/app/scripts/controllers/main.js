'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('webApp')
  .controller('MainCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
    var init = function () {
      $http.get(CONFIG.API.POSTS + "?limit=10")
        .then(function (res) {
          $scope.posts = res.data.posts;
          $rootScope.tags = res.data.tags;
        })
        .catch(function (error) {
          console.log("error", error);
          throw error;
        })
    };

    init();

  }]);
