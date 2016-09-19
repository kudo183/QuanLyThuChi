window.app.dataProvider.chiDataProvider = (function (webApi) {
    var dataProvider = {
        load: load,
        add: add,
        update: update,
        remove: remove,
        getValueFromKey: getValueFromKey
    };
    
    function load(done, fail) {
        $.when(
            webApi.chi.get({}),
            webApi.taiKhoan.get(),
            webApi.mucChi.get()
        ).done(function (chis, taiKhoans, mucChis) {
            var result = {
                items: []
            };
            
            result.comboBoxItemsSource = {};
            result.comboBoxItemsSource.taiKhoans = taiKhoans[0].items;
            result.comboBoxItemsSource.mucChis = mucChis[0].items;
            dataProvider.taiKhoans = taiKhoans[0].items;
            dataProvider.mucChis = mucChis[0].items;

            for (var i = 0; i < chis[0].items.length; i++) {
                var item = chis[0].items[i];
                item.ngay = new Date(item.ngay);
                item.tenTaiKhoan = dataProvider.getValueFromKey(dataProvider.taiKhoans, item.maTaiKhoan, "ma", "tenTaiKhoan");
                item.tenMucChi = dataProvider.getValueFromKey(dataProvider.mucChis, item.maMucChi, "ma", "tenMucChi");
                result.items.push(item);
            }
            done(result);
        }).fail(fail);
    }

    function add(item, done, fail) {
        webApi.chi.add(item)
            .done(function (chis) {
                var result = {
                    items: []
                };
                for (var i = 0; i < chis.items.length; i++) {
                    var item = chis.items[i];
                    item.ngay = new Date(item.ngay);
                    item.tenTaiKhoan = dataProvider.getValueFromKey(dataProvider.taiKhoans, item.maTaiKhoan, "ma", "tenTaiKhoan");
                    item.tenMucChi = dataProvider.getValueFromKey(dataProvider.mucChis, item.maMucChi, "ma", "tenMucChi");
                    result.items.push(item);
                }
                done(result);
            })
            .fail(fail);
    }

    function update(item, done, fail) {
        webApi.chi.update(item)
            .done(function (chis) {
                var result = {
                    items: []
                };
                for (var i = 0; i < chis.items.length; i++) {
                    var item = chis.items[i];
                    item.ngay = new Date(item.ngay);
                    item.tenTaiKhoan = dataProvider.getValueFromKey(dataProvider.taiKhoans, item.maTaiKhoan, "ma", "tenTaiKhoan");
                    item.tenMucChi = dataProvider.getValueFromKey(dataProvider.mucChis, item.maMucChi, "ma", "tenMucChi");
                    result.items.push(item);
                }
                done(result);
            })
            .fail(fail);
    }

    function remove(item, done, fail) {
        webApi.chi.remove(item)
            .done(function (chis) {
                var result = {
                    items: []
                };
                for (var i = 0; i < chis.items.length; i++) {
                    var item = chis.items[i];
                    item.ngay = new Date(item.ngay);
                    item.tenTaiKhoan = dataProvider.getValueFromKey(dataProvider.taiKhoans, item.maTaiKhoan, "ma", "tenTaiKhoan");
                    item.tenMucChi = dataProvider.getValueFromKey(dataProvider.mucChis, item.maMucChi, "ma", "tenMucChi");
                    result.items.push(item);
                }
                done(result);
            })
            .fail(fail);
    }
    
    function getValueFromKey(items, key, keyName, valueName) {
        items = ko.unwrap(items);
        key = ko.unwrap(key);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item[keyName] === key) {
                return item[valueName];
            }
        }
        return "";
    };

    return dataProvider;

})(window.app.webApi);