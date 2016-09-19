window.app.view.loginView = (function (utilsDOM) {

    var loginView = {
        show: show,
        init: init
    };
    return loginView;

    function show() {
        $("#loginView").show();
        $("#mainView").hide();
    };

    function init() {
        createViewContent("#loginView");
        var viewModel = window.app.viewModel.loginViewModel.create();

        ko.applyBindings(viewModel, $("#loginView")[0]);
    }

    function createViewContent(viewId) {
        $(viewId).append(utilsDOM.createElement("input", { type: "email", placeholder: "Email" }, "textInput: email"));
        $(viewId).append(utilsDOM.createElement("input", { type: "password", placeholder: "Password" }, "textInput: password"));
        $(viewId).append(utilsDOM.createElement("button", {}, "click: signInAction", "Sign in"));
        $(viewId).append(utilsDOM.createElement("button", {}, "click: registerAction", "Register"));
    };
})(window.huy.control.utilsDOM);