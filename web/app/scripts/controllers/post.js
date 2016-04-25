/**
 * Created by luch on 4/21/16.
 */

angular.module('webApp')
  .controller('PostCtrl', ['$rootScope', '$scope', '$http', '$routeParams', '$location',
    function ($rootScope, $scope, $http, $routeParams, $location) {
      var getPost = function () {
        $http.get(CONFIG.API.POSTS + '/' + $routeParams._id)
          .then(function (res) {
            $scope.post = res.data.post;
            $scope.post.tags = $scope.post.tags.join();
            $scope.tags = res.data.tags;
            $rootScope.tags = res.data.tags;
            $scope.pageUrl = $location.$$absUrl;
          })
          .catch(function (error) {
            console.log("error", error);
            throw error;
          })
      };

      var init = function () {
        $scope.isEditMode = false;
        $scope.isViewMode = true;
        getPost();
      };

      init();

      $scope.deletePost = function () {
        $http.delete(CONFIG.API.POSTS + '/' + $routeParams._id)
          .then(function () {
            $location.url('/');
          })
          .catch(function (err) {
            console.log("error", err);
            throw error;
          });
      };

      $scope.toggleMode = function () {
        $scope.isViewMode = !$scope.isViewMode;
        $scope.isEditMode = !$scope.isEditMode;
      };

      $scope.cancelUpdate = function () {
        getPost();
        $scope.toggleMode();
      };

      $scope.updatePost = function () {
        console.log($scope.post.tags);
        $scope.post.tags = $scope.post.tags.split(",");
        $http.put(CONFIG.API.POSTS + '/' + $routeParams._id, $scope.post)
          .then(function (res) {
            $scope.post = res.data.post;
          })
          .catch(function (err) {
            console.log("error", err);
            throw error;
          });
        $scope.toggleMode();
      };
    }]);
