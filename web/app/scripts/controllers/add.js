/**
 * Created by luch on 4/22/16.
 */
angular.module('webApp')
  .controller('AddCtrl', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location) {
    $scope.newPost = {
      title: "",
      tags: "",
      body: "",
      author: $scope.user.google.name ? $scope.user.google.name : "Lu Chen"
    };
    $scope.cancelUpdate = function () {
      $scope.newPost = {
        title: "",
        tags: "",
        body: "",
        bodyDes: "",
      };
    };

    $scope.updatePost = function () {
      $scope.newPost.tags = $scope.newPost.tags.split(",");
      $http.post(CONFIG.API.POSTS, $scope.newPost)
        .then(function () {
          $location.url('/');
        })
        .catch(function (err) {
          console.log("error", err);
          throw error;
        });
    };

  }]);
