window.app.view.loginView = (function (utilsDOM, webApi) {

    var loginView = {
        show: show
    };
    return loginView;

    function show() {
        var view = createView("loginView");
        $("body").empty();
        $("body").append(view);
        var viewModel = {
            email: ko.observable("huy@gmail.com"),
            password: ko.observable("nobita"),
            signInAction: function (model) {
                webApi.user.token({ user: model.email(), password: model.password() })
                    .done(function (token) {
                        window.localStorage.setItem(window.tokenKey, token);
                        window.app.view.mainView.show();
                    })
                    .fail(function (msg) {
                        console.log(msg);
                    });
            },
            registerAction: function (model) {
                webApi.user.register({ user: model.email(), password: model.password() })
                    .done(function (msg) {
                        console.log(msg);
                    })
                    .fail(function (msg) {
                        console.log(msg);
                    });
            }
        };
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
})(window.huy.control.utilsDOM, window.app.webApi);