/**
 * Created by luch on 4/22/16.
 */
angular.module('webApp')
  .controller('SearchCtrl', ['$rootScope', '$scope', '$http', '$routeParams',
    function ($rootScope, $scope, $http, $routeParams) {
      var init = function () {
        $http.get(CONFIG.API.SEARCH + $routeParams.keyword)
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
