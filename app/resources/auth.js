 angular.module("voyageur.resources").factory("authResource", ["$resource",
     function($resource){
        return $resource(cfg.apiRoot + "api-token-auth/?", {}, {
            authorize: {
                url: cfg.apiRoot + "api-token-auth/?",
                method: "POST"
            }
        });
 }]);