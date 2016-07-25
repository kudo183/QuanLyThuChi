window.app.view.loginView = (function (utilsDOM) {

    var loginView = {
        show: show
    };
    return loginView;

    function show() {
        var view = createView("loginView");
        $("body").empty();
        $("body").append(view);
        var viewModel = window.app.viewModel.loginViewModel.create();

        ko.applyBindings(viewModel, view);
    };

    function createView(id) {
        var view = utilsDOM.createElement("div");
        $(view).append(utilsDOM.createElement("input", { type: "email", placeholder: "Email" }, "textInput: email"));
        $(view).append(utilsDOM.createElement("input", { type: "password", placeholder: "Password" }, "textInput: password"));
        $(view).append(utilsDOM.createElement("button", {}, "click: signInAction", "Sign in"));
        $(view).append(utilsDOM.createElement("button", {}, "click: registerAction", "Register"));
        return view;
    };
})(window.huy.control.utilsDOM);