/**
 * Created by luch on 4/21/16.
 */
angular.module('webApp')
  .controller('PostListCtrl', ['$rootScope', '$scope', '$http', '$routeParams',
    function ($rootScope, $scope, $http, $routeParams) {
      var init = function () {
        var category = $routeParams.category;
        $http.get(CONFIG.API.POSTS + '?category=' + category)
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
