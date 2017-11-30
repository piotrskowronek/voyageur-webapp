'use strict';

angular.module('voyageur', [
  'ngRoute',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'voyageur.resources',
  'voyageur.board',
  'voyageur.site',
  'voyageur.landing'
]).
config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
}]);

angular.module('voyageur.resources', []);
