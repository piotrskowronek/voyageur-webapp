'use strict';

angular.module('voyageur.landing', ['ngRoute'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('landing', {
    templateUrl: 'landing/landing.html',
    url: '/',
    controller: 'LandingCtrl'
  });
}])

.controller('LandingCtrl', ['$scope', 'authResource', function($scope, authResource) {
  $scope.signInButton = {
     title: 'Sign In',
     templateUrl: 'landing/signin.html',
     isOpen: false
  };

  $scope.signInFormData = {
      username: '',
      password: ''
  };

  $scope.submitSignInForm = function(){
      authResource.authorize($scope.signInFormData);
  };
}]);