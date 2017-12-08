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

    .controller('UserBoardCtrl', ['$scope', '$rootScope', '$timeout', '$http', '$state', '$transition$', 'userResource',
        'posts', 'user',
        function ($scope, $rootScope, $timeout, $http, $state, $transition$, userResource, posts, user) {
            $scope.posts = posts;
            $scope.user = user;

            if (parseInt($scope.logged.id) === parseInt($transition$.params().id)) {
                $rootScope.initActionPostOnOwnBoard(function () {
                    $scope.reloadPosts();
                });
            } else {
                $rootScope.initActionPostOnSomebodysBoard($transition$.params().id, function () {
                    $scope.reloadPosts();
                });
            }

            $scope.invite = function(){
                userResource.invite({id: $transition$.params().id}).$promise.then(function(data){
                    return userResource.get({id: $transition$.params().id}).$promise;
                }).then(function(data){
                    $scope.user = data;
                });
            };

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

            $scope.want = function(place){
                postResource.create({}, {content: 'I want to go to ' + place}).$promise.then(function (data) {
                    $rootScope.showSuccessBox = true;
                    $timeout(function () {
                        $rootScope.showSuccessBox = false;
                    }, 2000);

                    $state.go('site.board');
                });
            };
        }]);