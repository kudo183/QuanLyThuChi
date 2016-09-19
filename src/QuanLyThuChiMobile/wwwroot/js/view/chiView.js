window.app.view.chiView = (function () {
    return function (id) {
        var listTemplate =
          '<div>'
            + '<span data-bind="text: tenMucChi"></span>'
            + '<span class="rightAlign" data-bind="text: soTien"></span>'
        + '</div>'
        + '<div class="clear borderBottom">'
            + '<span data-bind="text: ghiChu"></span>'
            + '<span class="rightAlign" data-bind="text: tenTaiKhoan"></span>'
        + '</div>';

        var view = window.huypq.control.editableList.createView(window.app.viewModel.chiViewModel, listTemplate);
        return view[0];
    }
})();