'use strict';

angular.module('voyageur.post', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.post', {
            url: '/post',
            views: {
                layout: {
                    templateUrl: 'components/post/post.html',
                    controller: 'PostCtrl'
                }
            },
            resolve: {
                messages: function (messageResource) {
                    return messageResource.query().$promise;
                }
            }
        });
    }])

    .controller('PostCtrl', ['$scope', '$rootScope', '$http', '$state', 'messageResource', 'userResource', 'messages',
        function ($scope, $rootScope, $http, $state, messageResource, userResource, messages) {
            $scope.messages = messages;

            $rootScope.initActionPostOnOwnBoard(function(){
                $scope.reloadPosts();
            });

            $scope.accept = function(id){
                userResource.accept({id: id}).$promise.then(function(data){
                    return messageResource.query().$promise;
                }).then(function(data){
                    $scope.reloadLogged();
                    $scope.messages = data;
                });
            };

            $scope.reject = function(id){
                userResource.reject({id: id}).$promise.then(function(data){
                    return messageResource.query().$promise;
                }).then(function(data){
                    $scope.reloadLogged();
                    $scope.messages = data;
                });
            };

            $scope.range = function (n) {
                return new Array(n);
            };

            $scope.reloadMessages = function(){
                messageResource.query().$promise.then(function(data){
                    $scope.messages = data;
                });
            };

            $scope.loadPreviousMessages = function(){
                $http.get($scope.messages.previous).then(function(response){
                    $scope.messages = response.data;
                });
            };

            $scope.loadNextMessages = function(){
                $http.get($scope.messages.next).then(function(response){
                    $scope.messages = response.data;
                });
            };
        }]);