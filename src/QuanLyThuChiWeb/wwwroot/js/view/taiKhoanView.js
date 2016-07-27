window.app.view.taiKhoanView = (function () {
    return function (id) {
        var view = window.huy.control.dataGrid.createView(id, {
            hasCustomFilter: false,
            hasColumnHeader: true,
            hasColumnFilter: false,
            hasBottomToolbar: true
        });
        return view;
    };
})();