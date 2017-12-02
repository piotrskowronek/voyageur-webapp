'use strict';

angular.module('voyageur.site', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site', {
            templateUrl: 'components/site/site.html',
            url: '',
            controller: 'SiteCtrl',
            resolve: {
                logged: function(userResource) {
                    return userResource.logged().$promise
                }
            }
        });
    }])

    .controller('SiteCtrl', ['$scope', '$state', '$http', 'logged', function ($scope, $state, $http, logged) {
        $scope.logged = logged;

        $scope.settingsButton = {
            templateUrl: 'components/site/settings.html',
            isOpen: false
        };

        $scope.logout = function(){
            delete $http.defaults.headers.common["Authorization"];
            sessionStorage.removeItem('token');
            $state.go('landing');
        };
    }]);