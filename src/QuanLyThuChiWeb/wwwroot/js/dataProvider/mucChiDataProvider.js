window.app.dataProvider.mucChiDataProvider = (function (webApi) {
    var dataProvider = {
        _items: [],
        getItemId: getItemId,
        setItemId: setItemId,
        toEntity: toEntity,
        getItemsAjax: getItemsAjax,
        saveChangesAjax: saveChangesAjax
    };

    return dataProvider;

    function getItemId(item) {
        return item.ma;
    }

    function setItemId(item, newId) {
        if (item.ma == undefined) {
            item.ma = ko.observable(newId);
        } else {
            item.ma(newId);
        }
    }

    function toEntity(item) {
        return {
            ma: ko.unwrap(item.ma),
            maUser: ko.unwrap(item.maUser),
            tenMucChi: ko.unwrap(item.tenMucChi)
        };
    }

    function getItemsAjax(filter, done, fail) {
        webApi.mucChi.get(filter)
            .done(function (mucChis) {
                var result = {
                    items: [],
                    totalItemCount: mucChis.totalItemCount,
                    pageIndex: mucChis.pageIndex,
                    pageCount: mucChis.pageCount
                };
                for (var i = 0; i < mucChis.items.length; i++) {
                    var item = mucChis.items[i];
                    result.items.push({
                        ma: ko.observable(item.ma),
                        maUser: ko.observable(item.maUser),
                        tenMucChi: ko.observable(item.tenMucChi)
                    });
                }

                done(result);
            }).fail(fail);
    }

    function saveChangesAjax(changes, done, fail) {
        webApi.mucChi.save(changes)
            .done(done)
            .fail(fail);
    }
})(window.app.webApi);