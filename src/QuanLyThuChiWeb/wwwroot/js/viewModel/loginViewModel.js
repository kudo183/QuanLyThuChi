window.app.viewModel.loginViewModel = (function (webApi) {

    var loginViewModel = {
        create: create
    };
    return loginViewModel;

    function create() {
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
                        console.log("fail: " + msg);
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
        return viewModel;
    };
})(window.app.webApi);