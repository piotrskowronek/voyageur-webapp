'use strict';

angular.module('voyageur.site', ['ngRoute'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('site', {
    templateUrl: 'site/site.html',
    url: '',
    controller: 'SiteCtrl'
  });
}])

.controller('SiteCtrl', [function() {

}]);