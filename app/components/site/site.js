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

    .controller('SiteCtrl', ['$scope', 'logged', function ($scope, logged) {
        $scope.logged = logged;
    }]);