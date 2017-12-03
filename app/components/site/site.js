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

    .controller('SiteCtrl', ['$scope', '$rootScope', '$state', '$http', 'logged', function ($scope, $rootScope, $state, $http, logged) {
        $scope.logged = logged;

        $rootScope.actionButton = {
            label: '',
            submitFn: function(){}
        };
        $rootScope.actionInput = {
            placeholder: '',
            value: ''
        };
        $rootScope.showSuccessBox = false;

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