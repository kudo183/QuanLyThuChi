window.app.viewModel.chiViewModel = (function () {
    var viewModel = huy.control.dataGrid.createViewModel(window.app.dataProvider.chiDataProvider);
    
    viewModel.addColumn({
        headerText: "Tài Khoản",
        type: "comboBox",
        cellValueProperty: "maTaiKhoan",
        itemsSourceName: "taiKhoans",
        itemText: "tenTaiKhoan",
        itemValue: "ma",
        readOnly: false,
        order: 0,
        filterValue: ko.observable()
    });

    viewModel.addColumn({
        headerText: "Mục Chi",
        type: "comboBox",
        cellValueProperty: "maMucChi",
        itemsSourceName: "mucChis",
        itemText: "tenMucChi",
        itemValue: "ma",
        readOnly: false,
        order: 0,
        filterValue: ko.observable()
    });

    viewModel.addColumn({
        headerText: "Số tiền",
        type: "textBox",
        cellValueProperty: "soTien",
        readOnly: false,
        order: 0,
        filterValue: ko.observable()
    });

    viewModel.addColumn({
        headerText: "Ngày",
        type: "date",
        cellValueProperty: "ngay",
        readOnly: true,
        order: 0,
        filterValue: ko.observable(huypq.dateTimeUtils.getCurrentDate())
    });

    viewModel.init = function () {
        if (viewModel.initialized === true)
            return;

        viewModel.initialized = true;

        viewModel.load(viewModel);
    };
    return viewModel;
})();