window.app.viewModel.mucChiViewModel = (function () {
    var viewModel = huy.control.dataGrid.createViewModel(window.app.dataProvider.mucChiDataProvider);

    viewModel.addColumn({
        headerText: "Tên Mục Chi",
        type: "textBox",
        cellValueProperty: "tenMucChi",
        readOnly: false,
        order: 0,
        filterValue: ko.observable()
    });

    viewModel.init = function () {
        if (viewModel.initialized === true)
            return;

        viewModel.initialized = true;

        viewModel.load(viewModel);
    };
    return viewModel;
})();