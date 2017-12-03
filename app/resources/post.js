angular.module("voyageur.resources").factory("postResource", ["$resource",
    function ($resource) {
        return $resource(cfg.apiRoot + "posts/?", {}, {
            query: {
                url: cfg.apiRoot + "posts/?",
                method: "GET",
                isArray: false
            },
            create: {
                // url: cfg.apiRoot + "posts/?"
                method: "POST"
            }
        });
    }]);