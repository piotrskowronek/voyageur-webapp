'use strict';

angular.module('voyageur.board', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.board', {
            url: '/board',
            views: {
                layout: {
                    templateUrl: 'components/board/board.html',
                    controller: 'BoardCtrl'
                }
            },
            resolve: {
                posts: function (postResource) {
                    return postResource.query().$promise;
                }
            }
        });
    }])

    .controller('BoardCtrl', ['$scope', '$rootScope', '$timeout', '$http', 'postResource', 'posts',
        function ($scope, $rootScope, $timeout, $http, postResource, posts) {
            $scope.posts = posts;

            $rootScope.initActionPostOnOwnBoard(function(){
                $scope.reloadPosts();
            });

            $scope.range = function (n) {
                return new Array(n);
            };

            $scope.reloadPosts = function(){
                postResource.query().$promise.then(function(data){
                    $scope.posts = data;
                });
            };

            $scope.loadPreviousPosts = function(){
                $http.get($scope.posts.previous).then(function(response){
                    $scope.posts = response.data;
                });
            };

            $scope.loadNextPosts = function(){
                $http.get($scope.posts.next).then(function(response){
                    $scope.posts = response.data;
                });
            };

            $scope.want = function(place){
                postResource.create({}, {content: 'I want to go to ' + place}).$promise.then(function (data) {
                    $rootScope.showSuccessBox = true;
                    $timeout(function () {
                        $rootScope.showSuccessBox = false;
                    }, 2000);
                    return postResource.query().$promise;
                }).then(function(data){
                    $scope.posts = data;
                });
            };
        }]);