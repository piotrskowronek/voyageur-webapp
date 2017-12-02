'use strict';

angular.module('voyageur.landing', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('landing', {
            templateUrl: 'components/landing/landing.html',
            url: '/',
            controller: 'LandingCtrl',
            data: {
                profileNotRequired: true
            }
        });
    }])

    .controller('LandingCtrl', ['$scope', '$state', '$uibModal', '$document', '$http', 'authResource',
        function ($scope, $state, $uibModal, $document, $http, authResource) {
            $scope.signInButton = {
                title: 'Sign In',
                templateUrl: 'components/landing/signin.html',
                isOpen: false
            };

            $scope.signInFormData = {
                username: '',
                password: ''
            };

            $scope.signInFormErrorText = '';

            $scope.submitSignInForm = function () {
                authResource.authorize({}, $scope.signInFormData, function (data) {
                    sessionStorage.setItem('token', data.token);
                    $http.defaults.headers.common["Authorization"] = "Token " + data.token;
                    $state.go('site.board');
                }, function (response) {
                    $scope.signInFormErrorText = response.data.non_field_errors[0]
                });
            };

            $scope.openSignUpModal = function () {
                var modalDOM = angular.element($document[0].querySelector('#modal'));

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/signup/signup.html',
                    controller: 'SignUpCtrl',
                    controllerAs: '$ctrl',
                    appendTo: modalDOM
                });

                modalInstance.result.then(function () {
                    $state.go('site.board');
                });
            };
        }]);