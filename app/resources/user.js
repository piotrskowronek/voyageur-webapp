 angular.module("voyageur.resources").factory("userResource", ["$resource",
     function($resource){
        return $resource(cfg.apiRoot + "users/?", {}, {
            get: {
                url: cfg.apiRoot + "users/:id/?",
                method: "GET",
                params: {
                    id: "@id"
                }
            },
            create: {
                url: cfg.apiRoot + "users/?",
                method: "POST"
            },
            logged: {
                url: cfg.apiRoot + "users/logged/?",
                method: "GET"
            },
            posts: {
                url: cfg.apiRoot + "users/:id/posts/?",
                method: "GET",
                params: {
                    id: "@id"
                }
            },
            publicMessage: {
                url: cfg.apiRoot + "users/:id/public_message/?",
                method: "POST",
                params: {
                    id: "@id"
                }
            },
            invite: {
                url: cfg.apiRoot + "users/:id/invite/?",
                method: "POST",
                params: {
                    id: "@id"
                }
            },
            accept: {
                url: cfg.apiRoot + "users/:id/accept_invitation/?",
                method: "POST",
                params: {
                    id: "@id"
                }
            },
            reject: {
                url: cfg.apiRoot + "users/:id/refuse_invitation/?",
                method: "POST",
                params: {
                    id: "@id"
                }
            },
            query: {
                url: cfg.apiRoot + "users/?",
                method: "GET",
                isArray: false
            }
        });
 }]);