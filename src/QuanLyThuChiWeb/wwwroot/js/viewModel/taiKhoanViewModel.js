window.app.viewModel.taiKhoanViewModel = (function () {
    var viewModel = huy.control.dataGrid.createViewModel(window.app.dataProvider.taiKhoanDataProvider);
    
    viewModel.addColumn({
        headerText: "Tên TK",
        type: "textBox",
        cellValueProperty: "tenTaiKhoan",
        readOnly: false,
        order: 0,
        filterValue: ko.observable()
    });

    viewModel.addColumn({
        headerText: "Số dư BĐ",
        type: "textBox",
        cellValueProperty: "soDuBanDau",
        readOnly: false,
        order: 0,
        filterValue: ko.observable()
    });

    viewModel.addColumn({
        headerText: "Số dư HT",
        type: "span",
        cellValueProperty: "soDuHienTai",
        readOnly: true,
        order: 0,
        filterValue: ko.observable()
    });

    viewModel.addColumn({
        headerText: "Ngày Tạo",
        type: "date",
        cellValueProperty: "ngayTao",
        readOnly: true,
        order: 0,
        filterValue: ko.observable(new Date())
    });

    viewModel.init = function () {
        if (viewModel.initialized === true)
            return;

        viewModel.initialized = true;

        viewModel.load(viewModel);
    };
    return viewModel;
})();