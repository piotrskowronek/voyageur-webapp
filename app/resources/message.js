angular.module("voyageur.resources").factory("messageResource", ["$resource",
    function ($resource) {
        return $resource(cfg.apiRoot + "messages/?", {}, {
            query: {
                url: cfg.apiRoot + "messages/?",
                method: "GET",
                isArray: false
            },
            create: {
                url: cfg.apiRoot + "messages/?",
                method: "POST"
            }
        });
    }]);