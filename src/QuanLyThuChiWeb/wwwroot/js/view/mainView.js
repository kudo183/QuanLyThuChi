window.app.view.mainView = (function (viewManager) {

    var mainView = {
        show: show,
        init: init
    };
    return mainView;

    function show() {
        $("#mainView").show();
        $("#loginView").hide();
    }

    function init() {
        var headerMenuViewModel = {
            items: [
                { text: "Tai khoan", value: "taiKhoanView", id: "" },
                { text: "Muc chi", value: "mucChiView", id: "" }
            ],
            selectedItemText: ko.observable(),
            selectedItemValue: ko.observable(),
            buttons: [
                {
                    text: "",
                    id: "refreshButton",
                    action: function () {
                        viewManager.loadCurrentView();
                    }
                },
                {
                    text: "&#x2716;",
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
    }
})(window.app.view.viewManager);