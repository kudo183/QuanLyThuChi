var headerMenuViewModel = {
    items: [
        { text: "Item 1", value: "item1", id: "" },
        { text: "Item 2", value: "item2", id: "" },
        { text: "Item 3", value: "item3", id: "" }
    ],
    selectedItemText: ko.observable("Item 2"),
    selectedItemValue: ko.observable("item2"),
    buttons: [
        {
            text: "",
            id: "refreshButton",
            action: function () {
                alert("refresh button clicked");
            }
        },
        {
            text: "A",
            id: "aButton",
            action: function () {
                alert("A button clicked");
            }
        }
    ]
};
$(document.body).append("<div id='headerMenu'/>");
$("#headerMenu").append(window.huy.control.headerMenu.createView("headerMenuView", headerMenuViewModel));