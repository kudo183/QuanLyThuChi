window.app.webApi = (function () {

    var webApi = {
        user: {
            register: function (param) {
                return get(apiUrl("user", "register"), param);
            },
            token: function (param) {
                return get(apiUrl("user", "token"), param);
            }
        },
        taiKhoan: {
            get: function () {
                return get(apiUrl("taikhoan", "getall"));
            },
            save: function (param) {
                return post(apiUrl("taikhoan", "save"), param);
            }
        },
        mucChi: {
            get: function () {
                return get(apiUrl("mucChi", "getall"));
            },
            save: function (param) {
                return post(apiUrl("mucChi", "save"), param);
            }
        },
        chi: {
            get: function (filter) {
                return get(apiUrl("chi", "get"), filter);
            },
            save: function (param) {
                return post(apiUrl("chi", "save"), param);
            }
        }
    };
    return webApi;

    function apiUrl(controller, action) { return "/" + controller + "/" + action; }

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

    function post(url, param) {
        var options = {
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            type: "post",
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
})();