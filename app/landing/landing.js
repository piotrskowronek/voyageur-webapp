'use strict';

angular.module('voyageur.landing', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('landing', {
            templateUrl: 'landing/landing.html',
            url: '/',
            controller: 'LandingCtrl'
        });
    }])

    .controller('LandingCtrl', ['$scope', '$state', '$uibModal', '$document', 'authResource',
        function ($scope, $state, $uibModal, $document, authResource) {
            $scope.signInButton = {
                title: 'Sign In',
                templateUrl: 'landing/signin.html',
                isOpen: false
            };

            $scope.signInFormData = {
                username: '',
                password: ''
            };

            $scope.signInFormErrorText = '';

            $scope.submitSignInForm = function () {
                authResource.authorize({}, $scope.signInFormData, function (data) {
                    localStorage.setItem('token', data.token);
                    $state.go('site.board');
                }, function (response) {
                    $scope.signInFormErrorText = response.data.non_field_errors[0]
                });
            };

            $scope.openSignUpModal = function () {
                var modalDOM = angular.element($document[0].querySelector('#modal'));

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'signup/signup.html',
                    controller: 'SignUpCtrl',
                    controllerAs: '$ctrl',
                    appendTo: modalDOM
                });

                modalInstance.result.then(function () {
                    $state.go('site.board');
                });
            };
        }]);