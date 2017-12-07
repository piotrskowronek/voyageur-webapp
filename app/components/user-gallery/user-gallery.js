'use strict';

angular.module('voyageur.user-gallery', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.user-gallery', {
            url: '/user/:id/gallery',
            views: {
                layout: {
                    templateUrl: 'components/user-gallery/user-gallery.html',
                    controller: 'UserGalleryCtrl'
                }
            },
            resolve: {
                profile: function (profileResource, $transition$) {
                    return profileResource.get({id: $transition$.params().id}).$promise;
                },
                user: function (userResource, $transition$) {
                    return userResource.get({id: $transition$.params().id}).$promise;
                },
                albums: function (userResource, $transition$){
                    return userResource.albums({id: $transition$.params().id}).$promise;
                }
            }
        });
    }])

    .controller('UserGalleryCtrl', ['$scope', '$rootScope', '$transition$', 'albumResource', 'user', 'profile', 'albums',
        function ($scope, $rootScope, $transition$, albumResource, user, profile, albums) {
            $scope.profile = profile;
            $scope.user = user;
            $scope.albums = albums;
            $scope.photos = [];

            $scope.chosenAlbumIndex = 0;

            $scope.invite = function(){
                userResource.invite({id: $transition$.params().id}).$promise.then(function(data){
                    return userResource.get({id: $transition$.params().id}).$promise;
                }).then(function(data){
                    $scope.user = data;
                });
            };

            $rootScope.initActionPostOnOwnBoard(function () {
                $scope.reloadPosts();
            });

            $scope.selectAlbum = function(idx){
                if ($scope.albums.length) {
                    albumResource.get({id: $scope.albums[idx].id}).$promise.then(function (data) {
                        $scope.photos = data.photos_readable;
                        $scope.chosenAlbumIndex = idx;
                    });
                } else {
                    $scope.photos = [];
                }
            };

            $scope.selectAlbum(0);
        }]);