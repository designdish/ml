var setCookie = function(cName, cValue, cExpires, cPath) {
    if (!cPath) {
        var domain =
            "/;domain=" + window.location.hostname.match(/[^\.]*\.[^.]*$/)[0];
        cPath = domain;
    }
    if (!cExpires) {
        cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
    }
    document.cookie =
        cName +
        "=" +
        cValue +
        ";expires=" +
        cExpires.toGMTString() +
        "; path=" +
        cPath;

    cCount++;
    console.dir(
        "the cookie value for " +
        cName +
        " was the number " +
        cCount +
        " cookie manipulated since pageload"
    );
    return cValue;
};