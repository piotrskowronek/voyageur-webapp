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
            },
            conversation: {
                url: cfg.apiRoot + "messages/:id/?",
                method: "GET",
                isArray: true,
                params: {
                    id: "@id"
                }
            },
            reply: {
                url: cfg.apiRoot + "messages/:id/reply/?",
                method: "POST",
                params: {
                    id: "@id"
                }
            }
        });
    }]);