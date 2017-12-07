'use strict';

angular.module('voyageur.gallery-create', ['ngRoute'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.gallery-create', {
            url: '/gallery/create/:id?',
            views: {
                layout: {
                    templateUrl: 'components/gallery-create/gallery-create.html',
                    controller: 'GalleryCreateCtrl'
                }
            },
            params: {
                id: {
                    type: "int"
                }
            }
        });
    }])

    .controller('GalleryCreateCtrl', ['$scope', '$rootScope', '$state', '$transition$', 'albumResource', 'Upload',
        function ($scope, $rootScope, $state, $transition$, albumResource, Upload) {
            $scope.files = null;
            $scope.photos = [];
            $scope.formData = {};

            $scope.$watch('files', function(){
                $scope.upload($scope.files);
            });

            if ($transition$.params().id){
                albumResource.get({id: $transition$.params().id}).$promise.then(function(data){
                    $scope.formData['name'] = data['name'];
                    $scope.formData['place'] = data['place'];
                    $scope.photos = data['photos_readable'];
                });
            }

            $scope.upload = function (file) {
                if (file) {
                    if (!file.$error) {
                        Upload.upload({
                            url: cfg.apiRoot + "photos/?",
                            data: {photo: file}
                        }).then(function (response) {
                            $scope.photos.push(response.data);
                        });
                    }
                }
            };

            $scope.removePhoto = function(idx){
                $scope.photos.splice(idx, 1);
            };

            $scope.moveUp = function(idx){
                var tmp = $scope.photos[idx];
                $scope.photos[idx] = $scope.photos[idx-1];
                $scope.photos[idx-1] = tmp;
            };

            $scope.moveDown = function(idx){
                var tmp = $scope.photos[idx];
                $scope.photos[idx] = $scope.photos[idx+1];
                $scope.photos[idx+1] = tmp;
            };
            $scope.save = function(){
                var data = $scope.formData;
                data.photos = [];
                for (var i = 0; i < $scope.photos.length; i++){
                    data.photos[i] = $scope.photos[i].id
                }

                var promise;
                if ($transition$.params().id){
                    promise = albumResource.update({id: $transition$.params().id}, data).$promise;
                } else {
                    promise = albumResource.create({}, data).$promise;
                }

                promise.then(function(data){
                    $state.go('site.gallery-list');
                }, function(request){
                    $scope.errors = request.data;
                });
            };

            $rootScope.initActionPostOnOwnBoard(function () {
                $scope.reloadPosts();
            });
        }]);