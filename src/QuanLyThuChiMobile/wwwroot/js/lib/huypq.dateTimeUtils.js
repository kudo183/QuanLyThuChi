window.huypq = window.huypq || {};
window.huypq.dateTimeUtils = (function () {

    var dateTimeUtils = {
        getCurrentDate: getCurrentDate
    };
    return dateTimeUtils;

    function getCurrentDate() {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }
})();