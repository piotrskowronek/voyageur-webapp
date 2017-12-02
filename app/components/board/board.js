'use strict';

angular.module('voyageur.board', ['ngRoute'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('site.board', {
        url: '/board',
        views: {
            layout: {
                templateUrl: 'components/board/board.html',
                controller: 'BoardCtrl'
            }
        }
  });
}])

.controller('BoardCtrl', [function() {

}]);