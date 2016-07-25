﻿window.app.webApi = (function () {

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
            getall: function (param) {
                return get(apiUrl("taikhoan", "getall"), param);
            },
            create: function (param) {
                return post(apiUrl("taikhoan", "create"), param);
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
            data: "=" + JSON.stringify(param)
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