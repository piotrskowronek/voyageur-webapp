'use strict';

angular.module('voyageur.gallery-list', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.gallery-list', {
            url: '/gallery',
            views: {
                layout: {
                    templateUrl: 'components/gallery-list/gallery-list.html',
                    controller: 'GalleryListCtrl'
                }
            },
            resolve: {
                albums: function (albumResource){
                    return albumResource.query().$promise;
                }
            }
        });
    }])

    .controller('GalleryListCtrl', ['$scope', '$rootScope', '$transition$', 'albumResource', 'albums',
        function ($scope, $rootScope, $transition$, albumResource, albums) {
            $scope.albums = albums;
            $scope.photos = [];

            $scope.chosenAlbumIndex = 0;

            $rootScope.initActionPostOnOwnBoard(function () {
                $scope.reloadPosts();
            });

            $scope.selectAlbum = function(idx){
                if ($scope.albums.length) {
                    albumResource.get({id: $scope.albums[idx].id}).$promise.then(function (data) {
                        $scope.photos = data.photos_readable;
                        $scope.chosenAlbumIndex = idx;
                    });
                }
            };

            $scope.selectAlbum(0);
        }]);