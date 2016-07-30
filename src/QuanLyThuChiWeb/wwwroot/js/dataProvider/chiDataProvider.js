window.app.dataProvider.chiDataProvider = (function (webApi) {
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
        if (item.ma === undefined) {
            item.ma = ko.observable(newId);
        } else {
            item.ma(newId);
        }
    }

    function toEntity(item) {
        return {
            ma: ko.unwrap(item.ma),
            maUser: ko.unwrap(item.maUser),
            maTaiKhoan: ko.unwrap(item.maTaiKhoan),
            maMucChi: ko.unwrap(item.maMucChi),
            soTien: ko.unwrap(item.soTien),
            ngay: ko.unwrap(item.ngay)
        };
    }

    function getItemsAjax(filter, done, fail) {
        $.when(
            webApi.chi.get(filter),
            webApi.taiKhoan.get(),
            webApi.mucChi.get()
        ).done(function (chis, taiKhoans, mucChis) {
            var result = {
                items: [],
                totalItemCount: chis[0].totalItemCount,
                pageIndex: chis[0].pageIndex,
                pageCount: chis[0].pageCount
            };
            for (var i = 0; i < chis[0].items.length; i++) {
                var item = chis[0].items[i];
                result.items.push({
                    ma: ko.observable(item.ma),
                    maUser: ko.observable(item.maUser),
                    maTaiKhoan: ko.observable(item.maTaiKhoan),
                    maMucChi: ko.observable(item.maMucChi),
                    soTien: ko.observable(item.soTien),
                    ngay: ko.observable(new Date(item.ngay))
                });
            }

            result.comboBoxItemsSource = {};
            result.comboBoxItemsSource.taiKhoans = taiKhoans[0].items;
            result.comboBoxItemsSource.mucChis = mucChis[0].items;
            done(result);
        }).fail(fail);
    }

    function saveChangesAjax(changes, done, fail) {
        webApi.chi.save(changes)
            .done(done)
            .fail(fail);
    }
})(window.app.webApi);