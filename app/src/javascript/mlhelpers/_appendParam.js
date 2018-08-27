var appendParam = function(url, param, paramVal) {
    var newLink =
        url.indexOf("?") != -1 ?
        url + "&" + param + "=" + paramVal :
        url + "?" + param + "=" + paramVal;
    return newLink;
};