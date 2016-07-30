window.app.view.chiView = (function () {
    return function (id) {
        var view = window.huy.control.dataGrid.createView(id, {
            hasCustomFilter: false,
            hasColumnHeader: true,
            hasColumnFilter: true,
            hasBottomToolbar: true
        });
        return view;
    };
})();