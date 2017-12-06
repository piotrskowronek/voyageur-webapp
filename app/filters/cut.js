angular.module("voyageur.filters").filter("cut", [
    function () {
        return function(item){
            if (item.length > 100)
                return item.substr(0, 100) + '...';
            return item;
        };
    }]);