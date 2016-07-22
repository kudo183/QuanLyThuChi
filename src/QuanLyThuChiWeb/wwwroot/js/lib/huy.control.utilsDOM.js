window.huy = window.huy || {};
window.huy.control = window.huy.control || {};

window.huy.control.utilsDOM = (function () {

    var utilsDom = {
        createElement: createElement,
        createComment: createComment,
        addClass: addClass,
        scrollToViewElement: scrollToViewElement
    };
    return utilsDom;

    function createElement(name, attrs, dataBind, text, cls) {
        var element = document.createElement(name);

        for (var att in attrs) {
            element.setAttribute(att, attrs[att]);
        }
        if (dataBind !== undefined) {
            element.setAttribute("data-bind", dataBind);
        }
        if (text !== undefined) {
            var n = document.createTextNode(text);
            element.appendChild(n);
        }

        if (cls !== undefined) {
            addClass(element, cls);
        }
        return element;
    }

    function createComment(text) {
        return document.createComment(text);
    }

    function addClass(element, cls) {
        if (cls !== undefined) {
            element.classList.add(cls);
        }
    }

    function scrollToViewElement(container, element) {
        var top = $(container).offset().top;
        var height = $(container).height();
        var elemTop = $(element).offset().top;
        var elemHeight = $(element).height();

        if (elemTop < top) {
            $(container).scrollTop($(container).scrollTop() - (top - elemTop));
        } else if (elemTop + elemHeight > top + height) {
            $(container).scrollTop($(container).scrollTop() + (elemTop + elemHeight - (top + height)));
        }
    }
})();