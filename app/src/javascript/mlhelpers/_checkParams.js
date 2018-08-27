var checkParams = function(url, arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        var param = arr[i];
        var paramVal = getValue(param);

        if (paramVal === null) {
            paramVal = getCookie(param);
            url = appendParam(url, param, paramVal);
        } else {
            // setCookie(param, paramVal);
            url = updateParam(url, param, paramVal);
        }
    }
    return url;
};