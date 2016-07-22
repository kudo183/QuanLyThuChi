window.huy = window.huy || {};
window.huy.control = window.huy.control || {};
window.huy.control.headerMenu = (function () {
    var headerMenu = {
        createView: createView
    };
    return headerMenu;
    
    function createView(id, model) {
        var view = window.huy.control.utilsDOM.createElement("div", { id: id });
        var viewLarge = createLargeMenuItem(id + "Large");
        view.appendChild(viewLarge);
        var viewMobile = createMobileMenuItem(id + "Mobile");
        view.appendChild(viewMobile);
        ko.applyBindings(model, view);
        return view;
    };

    function createLargeMenuItem(id) {
        var result = window.huy.control.utilsDOM.createElement("div", { id: id });
        var ul = window.huy.control.utilsDOM.createElement("ul", {}, "foreach: items");
        var li = window.huy.control.utilsDOM.createElement("li");
        var a = window.huy.control.utilsDOM.createElement("a", {},
            "attr: {'data-item': value, id: id},\
            click: function(){\
                $parent.selectedItemValue($data.value);\
                $parent.selectedItemText($data.text);\
            },\
            css: {selected: $parent.selectedItemValue() === value},\
            text: text",
            undefined, "menuItem");

        li.appendChild(a);
        ul.appendChild(li);
        result.appendChild(ul);

        ul = window.huy.control.utilsDOM.createElement("ul", {}, "foreach: buttons");
        li = window.huy.control.utilsDOM.createElement("li");
        a = window.huy.control.utilsDOM.createElement("a", {},
            "attr: {id: id},\
            click: action,\
            text: text",
            undefined, "menuButtonItem");

        li.appendChild(a);
        ul.appendChild(li);
        result.appendChild(ul);
        return result;
    }

    function createMobileMenuItem(id) {
        var result = window.huy.control.utilsDOM.createElement("div", { id: id });
        
        var selectedItem = window.huy.control.utilsDOM.createElement("span", { id: "mobileMenuSelectedItem" }, "text: selectedItemText");
        result.appendChild(selectedItem);

        var menu = window.huy.control.utilsDOM.createElement("div", { id: "mobileMenuButton" });
        $(menu).click(function () {
            $(menuWrapper).toggle();
        });
        result.appendChild(menu);

        result.appendChild(window.huy.control.utilsDOM.createComment("ko foreach: buttons"));
        a = window.huy.control.utilsDOM.createElement("a", {},
            "attr: {id: id+'Mobile'},\
            click: action,\
            text: text",
            undefined, "mobileMenuButtonItem");

        result.appendChild(a);
        result.appendChild(window.huy.control.utilsDOM.createComment("/ko"));
        
        var menuWrapper = window.huy.control.utilsDOM.createElement("div", { id: "mobileMenuWapper" });
        $(menuWrapper).hide();
        result.appendChild(menuWrapper);
        
        var ul = window.huy.control.utilsDOM.createElement("ul", {}, "foreach: items");
        var li = window.huy.control.utilsDOM.createElement("li");
        var a = window.huy.control.utilsDOM.createElement("a", {},
            "attr: {'data-item': value, id: id},\
            click: function(){\
                $parent.selectedItemValue($data.value);\
                $parent.selectedItemText($data.text);\
                $('#mobileMenuWapper').hide();\
            },\
            text: text",
            undefined, "mobileMenuItem");

        li.appendChild(a);
        ul.appendChild(li);
        menuWrapper.appendChild(ul);
        
        return result;
    }
})();