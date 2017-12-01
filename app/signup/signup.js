'use strict';

angular.module('voyageur.signup', ['ngRoute'])

    .controller('SignUpCtrl', ['$scope', '$state', '$q', '$uibModalInstance', 'userResource', 'authResource',
        function ($scope, $state, $q, $uibModalInstance, userResource, authResource) {
            $scope.signUpFormData = {
                email: '',
                password: '',
                last_name: '',
                first_name: ''
            };

            $scope.signUpFormErrorText = '';

            $scope.submitSignUpForm = function () {
                userResource.create({}, $scope.signUpFormData).$promise
                .then( function(data) {
                    var signInFormData = {
                        username: $scope.signUpFormData.email,
                        password: $scope.signUpFormData.password
                    };
                    return authResource.authorize({}, signInFormData).$promise;
                }, function (response) {
                    if ('email' in response.data && response.data.email[0] === "This field must be unique.") {
                        $scope.signUpFormErrorText = 'This email is already taken.';
                    }
                    return $q.reject();
                }).then(function (data) {
                    localStorage.setItem('token', data.token);
                    $uibModalInstance.close();
                    $state.go('site.board');
                }).catch(function(){});
            };
        }]);