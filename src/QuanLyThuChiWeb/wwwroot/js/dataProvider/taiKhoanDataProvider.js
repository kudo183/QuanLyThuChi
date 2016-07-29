window.app.dataProvider.taiKhoanDataProvider = (function (webApi) {
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
        item.soDuHienTai(item.soDuBanDau());
        return {
            ma: ko.unwrap(item.ma),
            maUser: ko.unwrap(item.maUser),
            tenTaiKhoan: ko.unwrap(item.tenTaiKhoan),
            soDuBanDau: ko.unwrap(item.soDuBanDau),
            soDuHienTai: ko.unwrap(item.soDuBanDau),
            ngayTao: ko.unwrap(item.ngayTao)
        };
    }

    function getItemsAjax(filter, done, fail) {
        webApi.taiKhoan.get(filter)
            .done(function (taiKhoans) {
                var result = {
                    items: [],
                    totalItemCount: taiKhoans.totalItemCount,
                    pageIndex: taiKhoans.pageIndex,
                    pageCount: taiKhoans.pageCount
                };
                for (var i = 0; i < taiKhoans.items.length; i++) {
                    var item = taiKhoans.items[i];
                    result.items.push({
                        ma: ko.observable(item.ma),
                        maUser: ko.observable(item.maUser),
                        tenTaiKhoan: ko.observable(item.tenTaiKhoan),
                        soDuBanDau: ko.observable(item.soDuBanDau),
                        soDuHienTai: ko.observable(item.soDuHienTai),
                        ngayTao: ko.observable(new Date(item.ngayTao))
                    });
                }

                done(result);
            }).fail(fail);
    }

    function saveChangesAjax(changes, done, fail) {
        webApi.taiKhoan.save(changes)
            .done(done)
            .fail(fail);
    }
})(window.app.webApi);