angular.module("voyageur.filters").filter("cut", [
    function () {
        return function(item, len){
            if (item.length > len)
                return item.substr(0, len) + '...';
            return item;
        };
    }]);