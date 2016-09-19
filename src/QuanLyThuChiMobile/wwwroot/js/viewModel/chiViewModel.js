window.app.viewModel.chiViewModel = (function () {
    var viewModel = window.huypq.control.editableList.createViewModel(window.app.dataProvider.chiDataProvider);

    viewModel.setPropertiesList([
        {
            name: "ma",
            type: "hidden"
        },
        {
            name: "maUser",
            type: "hidden"
        },
        {
            name: "soTien",
            type: "number",
            defaultValue: undefined,
            title: "So tien:"
        },
        {
            name: ["maMucChi", "tenMucChi", "mucChis", "ma", "tenMucChi"],
            type: "keyValue",
            defaultValue: undefined,
            title: "Muc chi:"
        },
        {
            name: "ghiChu",
            type: "text",
            defaultValue: undefined,
            title: "Ghi chu:"
        },
        {
            name: ["maTaiKhoan", "tenTaiKhoan", "taiKhoans", "ma", "tenTaiKhoan"],
            type: "keyValue",
            defaultValue: 1,
            title: "Tai khoan:"
        },
        {
            name: "ngay",
            type: "date",
            defaultValue: window.huypq.dateTimeUtils.getCurrentDate(),
            title: "Ngay:"
        }
    ]);

    viewModel.init = function () {
        if (viewModel.initialized === true)
            return;

        viewModel.initialized = true;

        viewModel.load(viewModel);
    };
    return viewModel;
})();