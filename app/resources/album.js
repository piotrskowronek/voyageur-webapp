 angular.module("voyageur.resources").factory("albumResource", ["$resource",
     function($resource){
        return $resource(cfg.apiRoot + "albums/?", {}, {
            query: {
                url: cfg.apiRoot + "albums/?",
                method: "GET",
                isArray: true
            },
            create: {
                url: cfg.apiRoot + "albums/?",
                method: "POST"
            },
            update: {
                url: cfg.apiRoot + "albums/:id/?",
                method: "PUT",
                params: {
                    id: "@id"
                }
            },
            get: {
                url: cfg.apiRoot + "albums/:id/?",
                method: "GET",
                params: {
                    id: "@id"
                }
            },
            delete: {
                url: cfg.apiRoot + "albums/:id/?",
                method: "DELETE",
                params: {
                    id: "@id"
                }
            }
        });
 }]);