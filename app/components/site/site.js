'use strict';

angular.module('voyageur.site', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site', {
            templateUrl: 'components/site/site.html',
            url: '',
            controller: 'SiteCtrl',
            resolve: {
                logged: function (userResource) {
                    return userResource.logged().$promise
                }
            }
        });
    }])

    .controller('SiteCtrl', ['$scope', '$rootScope', '$state', '$http', '$timeout', 'postResource', 'userResource',
        '$transition$', 'logged',
        function ($scope, $rootScope, $state, $http, $timeout, postResource, userResource, $transition$, logged) {
            $scope.logged = logged;

            $rootScope.actionButton = {
                label: '',
                submitFn: function () {
                }
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

            $scope.logout = function () {
                delete $http.defaults.headers.common["Authorization"];
                sessionStorage.removeItem('token');
                $state.go('landing');
            };

            $rootScope.initActionPostOnOwnBoard = function (callback) {
                $rootScope.actionButton = {
                    label: 'Post',
                    submitFn: function () {
                        postResource.create({}, {content: $rootScope.actionInput.value}, function (data) {
                            callback();
                            $rootScope.showSuccessBox = true;
                            $timeout(function () {
                                $rootScope.showSuccessBox = false;
                            }, 2000);
                            $rootScope.actionInput.value = '';
                        });
                    }
                };
                $rootScope.actionInput = {
                    placeholder: '"I want to go to London"',
                    value: ''
                };
            };

            $rootScope.initActionPostOnSomebodysBoard = function (id, callback) {
                $rootScope.actionButton = {
                    label: 'Post',
                    submitFn: function () {
                        userResource.publicMessage({id: id},
                            {content: $rootScope.actionInput.value}, function (data) {
                                callback();
                                $rootScope.showSuccessBox = true;
                                $timeout(function () {
                                    $rootScope.showSuccessBox = false;
                                }, 2000);
                                $rootScope.actionInput.value = '';
                            });
                    }
                };
                $rootScope.actionInput = {
                    placeholder: 'Write something on their board...',
                    value: ''
                };
            };
        }]);