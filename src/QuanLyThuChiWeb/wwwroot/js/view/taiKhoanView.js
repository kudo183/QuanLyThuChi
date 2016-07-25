window.app.view.taiKhoanView = (function (utilsDOM) {
    return function (id) {
        var view = utilsDOM.createElement("div");
        $(view).append(utilsDOM.createElement("input", { type: "email", placeholder: "Email" }));
        $(view).append(utilsDOM.createElement("input", { type: "password", placeholder: "Password" }));
        $(view).append(utilsDOM.createElement("button", {}, undefined, "OK"));
        return view;
    };
})(window.huy.control.utilsDOM);