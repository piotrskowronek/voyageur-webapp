'use strict';

angular.module('voyageur.profile-edition', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.profile-edition', {
            url: '/profile-edit',
            views: {
                layout: {
                    templateUrl: 'profile-edition/profile-edition.html',
                    controller: 'ProfileEditionCtrl'
                }
            },
            data: {
                profileNotRequired: true
            }
        });
    }])

    .controller('ProfileEditionCtrl', ['$scope', '$state', 'profileResource',
        function ($scope, $state, profileResource) {
            $scope.formData = {
                about_me: '',
                places_been_to: '',
                best_things: '',
                why_like_travel: ''
            };

            $scope.signUpFormErrorText = '';

            $scope.submitForm = function () {
                profileResource.update({}, $scope.formData).$promise
                    .then(function (data) {

                    }, function (response) {

                    });
            };
        }]);