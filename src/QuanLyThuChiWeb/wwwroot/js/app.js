(function (viewManager) {
    window.tokenKey = "accessToken";
    var token = window.localStorage.getItem(window.tokenKey);

    if (token) {
        window.app.view.mainView.show();
    } else {
        window.app.view.loginView.show();
    }
})();