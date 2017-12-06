'use strict';

angular.module('voyageur.search', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.search', {
            url: '/search',
            views: {
                layout: {
                    templateUrl: 'components/search/search.html',
                    controller: 'SearchCtrl'
                }
            },
            resolve: {
                users: function (userResource) {
                    return userResource.query({query: ''}).$promise;
                }
            }
        });
    }])

    .controller('SearchCtrl', ['$scope', '$rootScope', '$http', '$state', 'messageResource', 'userResource', 'users',
        function ($scope, $rootScope, $http, $state, messageResource, userResource, users) {
            $scope.users = users;

            $rootScope.initActionSearchUser(function(data){
                $scope.users = data;
            });

            $scope.loadPreviousUsers = function(){
                $http.get($scope.users.previous).then(function(response){
                    $scope.users = response.data;
                });
            };

            $scope.loadNextUsers = function(){
                $http.get($scope.users.next).then(function(response){
                    $scope.users = response.data;
                });
            };
        }]);