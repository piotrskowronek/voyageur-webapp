 angular.module("voyageur.resources").factory("profileResource", ["$resource",
     function($resource){
        return $resource(cfg.apiRoot + "profiles/:id/?", {}, {
            update: {
                url: cfg.apiRoot + "profiles/:id/?",
                method: "PUT",
                params: {
                    id: '@id'
                }
            }
        });
 }]);