(function (viewManager) {
    window.params = (function () {
        var result = {};
        window.location.search.substring(1).split("&").forEach(function (p) {
            var keyValue = p.split("=");
            result[keyValue[0]] = decodeURIComponent(keyValue[1]);
        });
        return result;
    })();

    console.log("params: " + JSON.stringify(window.params));
    $("body").append('<div id="loginView"></div>', '<div id="mainView"></div>');
    $("#mainView").append('<div id="headerContent"></div>', '<div id="mainContent"></div>');

    window.tokenKey = "accessToken";
    var token = window.localStorage.getItem(window.tokenKey);

    window.app.view.mainView.init();
    window.app.view.loginView.init();

    if (token) {
        window.app.view.mainView.show();
    } else {
        window.app.view.loginView.show();
    }
})();