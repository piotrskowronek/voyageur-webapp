'use strict';

angular.module('voyageur.post-compose', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.post-compose', {
            url: '/post/compose?id',
            views: {
                layout: {
                    templateUrl: 'components/post-compose/post-compose.html',
                    controller: 'PostComposeCtrl'
                }
            },
            params: {
                id: {
                    type: 'int'
                }
            }
        });
    }])

    .controller('PostComposeCtrl', ['$scope', '$rootScope', '$http', '$state', '$transition$', 'messageResource', 'userResource',
        function ($scope, $rootScope, $http, $state, $transition$, messageResource, userResource) {
            $scope.idPreloaded = $transition$.params().id != undefined;

            $scope.msg = {
                recipient: $transition$.params().id || null
            };

            $scope.errors = null;

            $scope.recipientInputConfig = {
                valueField: 'value',
                labelField: 'label',
                searchField: 'label',
                maxItems: 1,
                placeholder: 'Search for recipient...',
                load: function(query, callback){
                    userResource.query({label: query}).$promise.then(function(data){
                        callback(data.results);
                    });
                }
            };

            $scope.send = function(){
                messageResource.create({}, $scope.msg).$promise.then(function(data){
                    $state.go('site.post');
                }, function(response){
                    $scope.errors = response.data;
                });
            };

            $rootScope.initActionPostOnOwnBoard(function(){
                $scope.reloadPosts();
            });


        }]);