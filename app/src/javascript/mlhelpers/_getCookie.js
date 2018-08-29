var getCookie = function(cName) {
    var cStr = document.cookie;

    var startSlice = cStr.indexOf(cName + "=");
    if (startSlice == -1) {
        return false;
    }

    var endSlice = cStr.indexOf(";", startSlice + 1);
    if (endSlice == -1) {
        endSlice = cStr.length;
    }

    var cData = cStr.substring(startSlice, endSlice);
    var cValue = cData.substring(cData.indexOf("=") + 1, cData.length);
    return cValue;
};