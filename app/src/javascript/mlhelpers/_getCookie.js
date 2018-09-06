// getCookie functionality to using a split value (instead of slice).

var getCookie = function(cName) {
    var cStr = "; " + document.cookie;
    var parts = cStr.split("; " + cName + "=");
    if (parts.length == 2) {
        cValue = parts.pop().split(";").shift();
        return cValue;
    }
};