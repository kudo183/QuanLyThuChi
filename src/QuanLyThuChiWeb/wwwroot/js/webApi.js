window.app.webApi = (function () {

    var webApi = {
        user: {
            register: function (param) {
                return get(apiUrl("user", "register"), param);
            },
            token: function (param) {
                return get(apiUrl("user", "token"), param);
            }
        }
    };
    return webApi;

    function apiUrl(controller, action) { return "http://localhost:5005/" + controller + "/" + action; }

    function get(url, param) {
        param = param || {};
        var options = {
            dataType: "json",
            contentType: "application/json",
            cache: false,
            type: "get",
            data: "json=" + JSON.stringify(param)
        };

        var token = window.localStorage.getItem(window.tokenKey);

        if (token) {
            options.headers = {
                'token': token
            };
        }
        return $.ajax(url, options);
    }

    function saveChanges(changes, url) {
        var options = {
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            type: "post",
            data: "=" + JSON.stringify(changes)
        };
        var antiForgeryToken = $("#antiForgeryToken").val();
        if (antiForgeryToken) {
            options.headers = {
                'RequestVerificationToken': antiForgeryToken
            };
        }
        return $.ajax(url, options);
    }
})();