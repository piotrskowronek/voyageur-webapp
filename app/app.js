'use strict';

angular.module('voyageur', [
    'ngRoute',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angularMoment',
    'voyageur.resources',
    'voyageur.filters',
    'voyageur.board',
    'voyageur.user-board',
    'voyageur.signup',
    'voyageur.profile-edition',
    'voyageur.site',
    'voyageur.landing'
])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }])
    .run(['$http', function ($http) {
        var token = sessionStorage.getItem('token');
        if (token !== null){
            $http.defaults.headers.common["Authorization"] = "Token " + token;
        }
    }])
    .run(['$transitions', 'userResource', function ($transitions, userResource) {
        $transitions.onStart({to: 'site.**'}, function (trans) {
            if (!sessionStorage.getItem('token')) {
                return trans.router.stateService.target('landing');
            }
        });
        $transitions.onStart({to: function(state){
            return state.data === undefined || state.data.profileNotRequired === undefined || state.data.profileNotRequired === false;
        }}, function(trans){
            return userResource.logged().$promise.then(function(data){
                if (data.has_profile === false){
                    return trans.router.stateService.target('site.profile-edition');
                }
            });
        });
        $transitions.onStart({to: 'landing'}, function (trans) {
            if (sessionStorage.getItem('token')) {
                return trans.router.stateService.target('site.board');
            }
        });
    }]);

angular.module('voyageur.resources', []);
angular.module('voyageur.filters', []);
