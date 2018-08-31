var syncCookies = function(cName) {
    var absValue;
    if (typeof cName === "object") {
        for (var i = 0; i < cName.length; i++) {
            absValue = getValue(cName[i]);
            if (absValue != getCookie(cName[i])) {
                setCookie(cName[i], absValue);
                setCookie(cName[i], absValue, '', '/');
            }
        }
    } else {
        absValue = getValue(cName);
        if (absValue != getCookie(cName)) {
            setCookie(cName, absValue);
        }
    }
};