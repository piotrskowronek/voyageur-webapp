'use strict';

angular.module('voyageur.post-conversation', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.post-conversation', {
            url: '/post-conversation/:id',
            views: {
                layout: {
                    templateUrl: 'components/post-conversation/post-conversation.html',
                    controller: 'PostConversationCtrl'
                }
            },
            resolve: {
                messages: function (messageResource, $transition$) {
                    return messageResource.conversation({id: $transition$.params().id}).$promise;
                }
            }
        });
    }])

    .controller('PostConversationCtrl', ['$scope', '$rootScope', '$transition$', '$q', 'messageResource', 'userResource', 'messages',
        function ($scope, $rootScope, $transition$, $q, messageResource, userResource, messages) {
            $scope.reloadLogged();

            $scope.errors = null;

            $scope.messages = messages;
            $scope.showReplyForm = false;

            $scope.formData = {};

            $rootScope.initActionPostOnOwnBoard(function(){
                $scope.reloadPosts();
            });

            $scope.replyBtnClick = function(){
                $scope.showReplyForm = true;
            };

            $scope.sendMessage = function(){
                messageResource.reply({id: $transition$.params().id}, $scope.formData).$promise.then(function(data){
                    return messageResource.conversation({id: $transition$.params().id}).$promise;
                }, function(response){
                    $scope.errors = response.data;
                    return $q.reject();
                }).then(function(messages){
                    $scope.messages = messages;
                    $scope.formData = {};
                    $scope.showReplyForm = false;
                });
            };
        }]);