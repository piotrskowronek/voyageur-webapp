'use strict';

angular.module('voyageur.user-about', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.user-about', {
            url: '/user/:id/about',
            views: {
                layout: {
                    templateUrl: 'components/user-about/user-about.html',
                    controller: 'UserAboutCtrl'
                }
            },
            resolve: {
                profile: function (profileResource, $transition$) {
                    return profileResource.get({id: $transition$.params().id}).$promise
                },
                user: function (userResource, $transition$) {
                    return userResource.get({id: $transition$.params().id}).$promise
                }
            }
        });
    }])

    .controller('UserAboutCtrl', ['$scope', '$rootScope', '$transition$', 'user', 'profile', 'logged',
        function ($scope, $rootScope, $transition$, user, profile, logged) {
            $scope.profile = profile;
            $scope.user = user;

            if (parseInt(logged.id) === parseInt($transition$.params().id)) {
                $rootScope.initActionPostOnOwnBoard(function () {
                    $scope.reloadPosts();
                });
            } else {
                $rootScope.initActionPostOnSomebodysBoard($transition$.params().id, function () {
                    $scope.reloadPosts();
                });
            }
        }]);