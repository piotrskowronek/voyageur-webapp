'use strict';

angular.module('voyageur', [
  'ngRoute',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'voyageur.resources',
  'voyageur.board',
  'voyageur.signup',
  'voyageur.site',
  'voyageur.landing'
]).
config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
}])
.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}])
.run(['$transitions', function($transitions){
  $transitions.onStart({to: 'site.**'}, function(trans){
      if (!localStorage.getItem('token')){
          return trans.router.stateService.target('landing');
      }
  });
  $transitions.onStart({to: 'landing'}, function(trans){
      if (localStorage.getItem('token')){
          return trans.router.stateService.target('site.board');
      }
  });
}]);

angular.module('voyageur.resources', []);
