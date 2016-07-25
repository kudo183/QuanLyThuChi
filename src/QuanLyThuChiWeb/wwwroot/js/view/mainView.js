window.app.view.mainView = (function (viewManager) {

    var mainView = {
        show: show
    };
    return mainView;

    function show(id) {
        $("body").empty();
        $("body").append('<div id="headerContent"></div>');
        $("body").append('<div id="mainContent"></div>');

        var headerMenuViewModel = {
            items: [
                { text: "Tai khoan", value: "taiKhoanView", id: "" }
            ],
            selectedItemText: ko.observable(),
            selectedItemValue: ko.observable(),
            buttons: [
                {
                    text: "",
                    id: "refreshButton",
                    action: function () {
                        alert("refresh button clicked");
                    }
                },
                {
                    text: "x",
                    id: "exitButton",
                    action: function () {
                        window.localStorage.removeItem(window.tokenKey);
                        window.app.view.loginView.show();
                    }
                }
            ]
        };

        viewManager.init("#headerContent", "#mainContent", headerMenuViewModel);
        viewManager.setCurrentView(0);
    };
})(window.app.view.viewManager);