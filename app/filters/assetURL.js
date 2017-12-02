angular.module("voyageur.filters").filter("assetURL", [
    function () {
        return function(item){
            return cfg.assetRoot + item;
        };
    }]);