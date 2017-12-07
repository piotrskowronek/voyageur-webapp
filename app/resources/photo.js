 angular.module("voyageur.resources").factory("photoResource", ["$resource",
     function($resource){
        return $resource(cfg.apiRoot + "albums/?", {}, {
            create: {
                url: cfg.apiRoot + "photos/?",
                method: "POST"
            }
        });
 }]);