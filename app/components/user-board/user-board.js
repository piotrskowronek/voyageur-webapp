'use strict';

angular.module('voyageur.user-board', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.user-board', {
            url: '/user/:id/board',
            views: {
                layout: {
                    templateUrl: 'components/user-board/user-board.html',
                    controller: 'UserBoardCtrl'
                }
            },
            resolve: {
                posts: function (userResource, $transition$) {
                    return userResource.posts({id: $transition$.params().id}).$promise;
                },
                user: function (userResource, $transition$) {
                    return userResource.get({id: $transition$.params().id}).$promise
                }
            }
        });
    }])

    .controller('UserBoardCtrl', ['$scope', '$rootScope', '$timeout', '$http', '$transition$', 'userResource',
        'posts', 'user', 'logged',
        function ($scope, $rootScope, $timeout, $http, $transition$, userResource, posts, user, logged) {
            $scope.posts = posts;
            $scope.user = user;

            if (parseInt(logged.id) === parseInt($transition$.params().id)) {
                $rootScope.initActionPostOnOwnBoard(function () {
                    $scope.reloadPosts();
                });
            } else {
                $rootScope.initActionPostOnSomebodysBoard(function () {
                    $scope.reloadPosts();
                });
            }

            $scope.range = function (n) {
                return new Array(n);
            };

            $scope.reloadPosts = function () {
                userResource.posts({id: $transition$.params().id}).$promise.then(function (data) {
                    $scope.posts = data;
                });
            };

            $scope.loadPreviousPosts = function () {
                $http.get($scope.posts.previous).then(function (response) {
                    $scope.posts = response.data;
                });
            };

            $scope.loadNextPosts = function () {
                $http.get($scope.posts.next).then(function (response) {
                    $scope.posts = response.data;
                });
            };
        }]);