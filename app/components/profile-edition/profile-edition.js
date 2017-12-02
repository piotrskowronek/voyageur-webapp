'use strict';

angular.module('voyageur.profile-edition', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.profile-edition', {
            url: '/profile-edit',
            views: {
                layout: {
                    templateUrl: 'components/profile-edition/profile-edition.html',
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

            $scope.errors = null;
            $scope.success = false;

            $scope.submitForm = function () {
                profileResource.update({id: $scope.logged.id}, $scope.formData).$promise
                    .then(function (data) {
                        if ($scope.logged.has_profile){
                            $scope.success = true;
                        } else {
                            $state.go('site.board');
                        }
                    }, function (response) {
                        $scope.errors = response.data
                    });
            };
        }]);