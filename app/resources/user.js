 angular.module("voyageur.resources").factory("userResource", ["$resource",
     function($resource){
        return $resource(cfg.apiRoot + "users/?", {}, {
            create: {
                url: cfg.apiRoot + "users/?",
                method: "POST"
            }
        });
 }]);