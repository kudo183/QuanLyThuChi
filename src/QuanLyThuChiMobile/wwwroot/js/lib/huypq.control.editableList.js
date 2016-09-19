window.huypq = window.huypq || {};
window.huypq.control = window.huypq.control || {};
window.huypq.control.editableList = (function () {
    var editableList = {
        createView: createView,
        createViewModel: createViewModel
    };
    return editableList;

    function createView(viewModel, listTemplate) {
        var view = $('<div class="editableList"></div>');
        var topBar = $('<div><input type="text" placeholder="search text" onClick="this.setSelectionRange(0, this.value.length)" data-bind="value: searchText"></div>');
        var btnToggleEditBlock = $('<button data-bind="html: toggleButtonText"></button>');
        topBar.append(btnToggleEditBlock);
        view.append(topBar);
        var editBlock = $('<div class="editBlock" data-bind="with: activeItem"></div>');
        $(editBlock).hide();
        view.append(editBlock);
        for (var i = 0; i < viewModel.propertiesList.length; i++) {
            var p = viewModel.propertiesList[i];
            if (p.type === "hidden") {
                continue;
            }

            editBlock.append('<div>' + p.title + '</div>');
            if (p.type === "keyValue") {
                var combobox = '<div data-bind="cbSelectedValue: '
                + p.name[0]
                + ', cbItems: $parent.'
                + p.name[2]
                + ", cbItemValue: '" + p.name[3] + "'"
                + ", cbItemText: '" + p.name[4] + "'"
                + '"></div>';
                editBlock.append(combobox);
            } else if (p.type === "text") {
                var text = '<div><input type="text" onClick="this.setSelectionRange(0, this.value.length)" data-bind="textInput: '
                + p.name
                + '"></div>';
                editBlock.append(text);
            } else if (p.type === "number") {
                var number = '<div><input type="number" onClick="this.setSelectionRange(0, this.value.length)" data-bind="textInput: '
                + p.name
                + '"></div>';
                editBlock.append(number);
            } else if (p.type === "date") {
                var number = '<div><input data-bind="datepicker: '
                + p.name
                + '"></div>';
                editBlock.append(number);
            }
        }
        editBlock.append("<br />");

        var buttons = $('<div class="rightAlign"></div>');
        editBlock.append(buttons);
        editBlock.append('<div class="clear"></div>');
        var btnAdd = $("<button>+</button>");
        var btnSave = $("<button>&#x1f4be</button>");
        var btnDelete = $("<button>&#x2715</button>");
        buttons.append(btnAdd);
        buttons.append(btnSave);
        buttons.append(btnDelete);

        $(btnAdd).click(function () {
            viewModel.add(viewModel);
            view.hideEditBlock(viewModel);
        });

        $(btnSave).click(function () {
            viewModel.update(viewModel);
            view.hideEditBlock(viewModel);
        });

        $(btnDelete).click(function () {
            viewModel.remove(viewModel);
            view.hideEditBlock(viewModel);
        });

        $(btnToggleEditBlock).click(function () {
            if (viewModel.toggleButtonText() === "&#x2228") {
                $(viewModel.btnSave).hide();
                $(viewModel.btnDelete).hide();
                viewModel.activeItem.fromDefaultValue(viewModel);
                $(editBlock).show(200);
                $(itemList).hide();
                viewModel.toggleButtonText("&#x2227");
            } else {
                view.hideEditBlock(viewModel);
            }
        });

        var itemList = $('<div class="itemList" data-bind="foreach: items"></div>');
        var itemWrapper = $('<div data-bind="click: $root.itemClicked.bind($data, $root)"></div>');

        view.append(itemList);
        itemList.append(itemWrapper);
        itemWrapper.append(listTemplate);

        viewModel.editBlock = editBlock;
        viewModel.btnAdd = btnAdd;
        viewModel.btnSave = btnSave;
        viewModel.btnDelete = btnDelete;
        viewModel.itemList = itemList;

        view.hideEditBlock = function (viewModel) {
            $(viewModel.editBlock).hide();
            $(viewModel.itemList).show(200);
            viewModel.toggleButtonText("&#x2228");
        };

        return view;
    }

    function createViewModel(dataProvider) {
        var viewModel = {
            searchText: "",
            toggleButtonText: ko.observable("&#x2228"),
            activeItem: {},
            items: ko.observableArray(),
            propertiesList: [],
            itemClicked: function (viewModel) {
                $(viewModel.btnSave).show();
                $(viewModel.btnDelete).show();
                viewModel.activeItem.fromItem(viewModel, this);
                $(viewModel.editBlock).show(200);
                $(viewModel.itemList).hide();
                viewModel.toggleButtonText("&#x2227");
            },
            editBlock: {},
            dataProvider: dataProvider
        };

        viewModel.activeItem.toItem = function (viewModel) {
            var result = {};
            for (var i = 0; i < viewModel.propertiesList.length; i++) {
                var property = viewModel.propertiesList[i];
                if (property.type === "keyValue") {
                    var key = ko.unwrap(this[property.name[0]]);
                    result[property.name[0]] = key;
                } else {
                    result[property.name] = ko.unwrap(this[property.name]);
                }
            }
            return result;
        }

        viewModel.activeItem.fromItem = function (viewModel, item) {
            for (var i = 0; i < viewModel.propertiesList.length; i++) {
                var property = viewModel.propertiesList[i];
                if (property.type === "keyValue") {
                    viewModel.activeItem[property.name[0]](ko.unwrap(item[property.name[0]]));
                } else {
                    viewModel.activeItem[property.name](ko.unwrap(item[property.name]));
                }
            }
        };

        viewModel.activeItem.fromDefaultValue = function (viewModel) {
            for (var i = 0; i < viewModel.propertiesList.length; i++) {
                var property = viewModel.propertiesList[i];
                if (property.type === "keyValue") {
                    viewModel.activeItem[property.name[0]](property.defaultValue);
                } else {
                    viewModel.activeItem[property.name](property.defaultValue);
                }
            }
        };

        viewModel.setPropertiesList = function (p) {
            for (var i = 0; i < p.length; i++) {
                var property = p[i];
                if (property.type === "keyValue") {
                    this.activeItem[property.name[0]] = ko.observable(property.defaultValue);
                    this[property.name[2]] = ko.observableArray();
                } else {
                    this.activeItem[property.name] = ko.observable(property.defaultValue);
                }
                this.propertiesList.push(property);
            }
        }

        viewModel.load = function (viewModel) {
            viewModel.dataProvider.load(function (result) {
                for (var d in result.comboBoxItemsSource) {
                    viewModel[d](result.comboBoxItemsSource[d]);
                }

                viewModel.items(result.items);

            }, function (error) {
                console.log("getItems error: " + JSON.stringify(error));
            });
        }

        viewModel.add = function (viewModel) {
            viewModel.dataProvider.add(viewModel.activeItem.toItem(viewModel), function (result) {

                viewModel.items(result.items);

            }, function (error) {
                console.log("getItems error: " + JSON.stringify(error));
            });
        }

        viewModel.update = function () {
            viewModel.dataProvider.update(viewModel.activeItem.toItem(viewModel), function (result) {

                viewModel.items(result.items);

            }, function (error) {
                console.log("getItems error: " + JSON.stringify(error));
            });
        }

        viewModel.remove = function () {
            viewModel.dataProvider.remove(viewModel.activeItem.toItem(viewModel), function (result) {

                viewModel.items(result.items);

            }, function (error) {
                console.log("getItems error: " + JSON.stringify(error));
            });
        }

        return viewModel;
    }
})();