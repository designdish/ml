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

    console.log('--- \n this cookie is called ' + cName + '\n it expires on ' + cExpires + '\n the path is ' + cPath + '\n the value is ' + cValue + '\n the cookie count is up to ' + cCount + '\n                                                                and that\'s all i have to say about that. \n---');
    return cValue;
};