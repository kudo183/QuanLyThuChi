(function () {
    window.huy.log = function (text) {
        //console.log(text);
    };

    ko.bindingHandlers.cbSelectedValue = {
        after: ['cbItems'],
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());
            if (element._selectedValue === value) {
                return;
            }
            element._selectedValue = value;
            element._setSelectedValue(value);
            window.huy.log("cbSelectedValue update");
        }
    };
    ko.bindingHandlers.cbItems = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            window.huy.log("cbItems init");
            initComboBox(element, allBindings);
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            window.huy.log("cbItems update");
            element._setItems(ko.unwrap(valueAccessor()));
        }
    };

    function initComboBox(element, allBindings) {
        window.huy.log("initComboBox");

        var comboBox = element;
        comboBox._listDiv = {};
        comboBox._input = {};
        comboBox._items = [];
        comboBox._filteredItems = [];
        comboBox._ul = {};
        comboBox._selectedItemIndex = -1;
        comboBox._selectedValue = undefined;
        comboBox._setItems = fnSetItems;
        comboBox._setSelectedValue = fnSetSelectedValue;

        $(comboBox).addClass("h-comboBox");
        var wrapper = window.huy.control.utilsDOM.createElement("div", {}, undefined, undefined, "h-wrapper");
        var inputWrapper = window.huy.control.utilsDOM.createElement("div", {}, undefined, undefined, "h-input-wrapper");
        comboBox._input = window.huy.control.utilsDOM.createElement("input", { type: "text" });
        var buttonWrapper = window.huy.control.utilsDOM.createElement("div", {}, undefined, undefined, "h-button-wrapper");
        comboBox._button = window.huy.control.utilsDOM.createElement("button", { tabindex: -1 }, undefined, "▼");
        comboBox._listDiv = window.huy.control.utilsDOM.createElement("div", { style: "display:none;" }, undefined, undefined, "h-boundlist-wrapper");
        comboBox._ul = window.huy.control.utilsDOM.createElement("ul", {});

        inputWrapper.appendChild(comboBox._input);
        wrapper.appendChild(inputWrapper);
        buttonWrapper.appendChild(comboBox._button);
        wrapper.appendChild(buttonWrapper);
        comboBox.appendChild(wrapper);
        comboBox._listDiv.appendChild(comboBox._ul);
        comboBox.appendChild(comboBox._listDiv);

        var hideListTimer;
        var selectItemTimer;

        comboBox._input.onkeydown = fnInputKeyDown;

        comboBox._input.oninput = fnOnInput;

        comboBox._input.onblur = fnInputOnBlur;

        comboBox._button.onclick = fnButtonOnClick;

        function fnOnInput() {
            window.huy.log("fnOnInput: " + this.value);

            filterItems(this.value);
            renderItems(comboBox._ul, comboBox._filteredItems);

            if (comboBox._filteredItems.length === 0) {
                $(this)[0].setCustomValidity("invalid");
            } else {
                $(this)[0].setCustomValidity("");
            }
        }

        function fnInputOnBlur() {
            window.huy.log("fnInputOnBlur");
            if ($(comboBox._listDiv).is(":visible") === true) {
                hideListTimer = setTimeout(cancelChangeAndHideList, 300);

                window.huy.log("isValid when lostFocus:" + $(this)[0].validity.valid);
            }
        }

        function fnInputKeyDown(event) {
            switch (event.keyCode) {
                case 27://Esc
                    //use timer instead of direct call
                    //because if direct call, firefox will raise oninput event after this event because input text changed.
                    setTimeout(cancelChangeAndHideList, 100);
                    break;
                case 9://Tab
                    if ($(comboBox._listDiv).is(":visible") === true) {
                        setValueAndHideList();
                    }
                    break;
                case 13://Enter
                    if ($(comboBox._listDiv).is(":visible") === true) {
                        setValueAndHideList();
                        $(comboBox._input).select();
                    }
                    break;
                case 38://Up
                    if ($(comboBox._listDiv).is(":visible") && comboBox._selectedItemIndex > 0) {
                        highlightItem(comboBox._selectedItemIndex - 1);
                    }
                    break;
                case 40://Down
                    if (comboBox._selectedItemIndex < comboBox._filteredItems.length - 1) {
                        highlightItem(comboBox._selectedItemIndex + 1);
                    }
                    break;
            }

            window.huy.log("onkeydown: " + event.keyCode);
        }

        function fnButtonOnClick() {
            window.huy.log("fnButtonOnClick");
            clearTimeout(hideListTimer);

            if ($(comboBox._listDiv).is(":visible")) {
                cancelChangeAndHideList();
            } else {
                setInputText(undefined);
                comboBox._filteredItems = comboBox._items;
                renderItems(comboBox._ul, comboBox._filteredItems);
            }
            focusInputAndSelectAllText();
        }

        function fnSetSelectedValue(value) {
            window.huy.log("fnSetSelectedValue");
            var textValue = $(comboBox._input).val();
            if (typeof value === "undefined" && typeof textValue !== "undefined") {
                setInputText(undefined);
                comboBox._filteredItems = comboBox._items;
                return;
            }

            var filteredItems = [];
            for (var i = 0; i < comboBox._items.length; i++) {
                var itemValue = getItemValue(comboBox._items[i]);
                if (itemValue === value) {
                    filteredItems.push(comboBox._items[i]);
                }
            }

            if (filteredItems.length === 0) {
                return;
            } else {
                setInputText(getItemText(filteredItems[0]));
                comboBox._filteredItems = filteredItems;
            }
        }

        function fnSetItems(items) {
            window.huy.log("fnSetItems");
            setInputText(undefined);
            comboBox._items = items;

            element._setSelectedValue(element._selectedValue);
        }

        function cancelChangeAndHideList() {
            window.huy.log("cancelChangeAndHideList");

            comboBox._filteredItems = [];
            for (var i = 0; i < comboBox._items.length; i++) {
                var itemValue = getItemValue(comboBox._items[i]);
                if (itemValue === comboBox._selectedValue) {
                    comboBox._filteredItems.push(comboBox._items[i]);
                }
            }

            setInputText(getItemText(comboBox._filteredItems[0]));

            hideList();
        }

        function setValueAndHideList() {
            window.huy.log("setValueAndHideList");
            var item = comboBox._filteredItems[comboBox._selectedItemIndex];
            var text = getItemText(item);
            setInputText(text);
            filterItems(text);

            var cbSelectedValue = allBindings.get("cbSelectedValue");
            element._selectedValue = getItemValue(item);
            cbSelectedValue(element._selectedValue);

            hideList();
        }

        function highlightItem(index) {
            window.huy.log("highlightItem");

            $(comboBox._ul).children().eq(comboBox._selectedItemIndex).removeClass("h-boundlist-selected");

            var elem = $(comboBox._ul).children().eq(index);
            elem.addClass("h-boundlist-selected");

            window.huy.control.utilsDOM.scrollToViewElement(comboBox._listDiv, elem);
            
            comboBox._selectedItemIndex = index;
        }

        function hideList() {
            window.huy.log("hideList");
            clearTimeout(hideListTimer);
            $(comboBox._listDiv).hide();
            $(comboBox._ul).empty();
        }

        function focusInputAndSelectAllText() {
            $(comboBox._input).focus();
            $(comboBox._input).select();
        }

        function selectItem(li) {
            window.huy.log("selectItem:" + li.innerText);
            highlightItem(li._index);
            setValueAndHideList();
            focusInputAndSelectAllText();
        }

        function filterItems(value) {
            window.huy.log("filterItems");
            comboBox._filteredItems = [];
            for (var i = 0; i < comboBox._items.length; i++) {
                if (getItemText(comboBox._items[i]).search(new RegExp(value.replace("\\", "\\\\"), "i")) == 0) {
                    comboBox._filteredItems.push(comboBox._items[i]);
                }
            }
        }

        function renderItems(ul, items) {
            window.huy.log("renderItems");
            $(comboBox._ul).empty();

            for (var i = 0; i < items.length; i++) {
                var li = window.huy.control.utilsDOM.createElement("li", {}, undefined, getItemText(items[i]));
                li._index = i;
                li.onclick = function () {
                    window.huy.log("li onclick");
                    selectItem(this);
                };
                li.ontouchstart = function () {//for chrome tablet, chrome tablet onclick work incorrect
                    window.huy.log("li ontouchstart");
                    selectItemTimer = setTimeout(selectItem.bind(null, this), 300);
                };
                li.ontouchmove = function () {
                    window.huy.log("li ontouchmove");
                    clearTimeout(selectItemTimer);
                };

                li.onmouseover = function () {
                    window.huy.log("li onmouseover");
                    highlightItem(this._index);
                };
                ul.appendChild(li);
            }

            $(comboBox._listDiv).show();
            
            highlightItem(0);
        }

        function setInputText(text) {
            window.huy.log("setInputText: " + text);
            $(comboBox._input).val(text);
        }

        function getItemText(item) {
            if (allBindings.has("cbItemText")) {
                var t = allBindings.get("cbItemText");
                if(item === undefined){
                    return undefined;
                }
                var u = ko.unwrap(item);
                return u[t];
            } else {
                return ko.unwrap(item);
            }
            return ko.unwrap(item);
        }

        function getItemValue(item) {
            if (allBindings.has("cbItemValue")) {
                var t = allBindings.get("cbItemValue");
                if(item === undefined){
                    return undefined;
                }
                var u = ko.unwrap(item);
                return u[t];
            } else {
                return ko.unwrap(item);
            }
            return ko.unwrap(item);
        }
    }
})();