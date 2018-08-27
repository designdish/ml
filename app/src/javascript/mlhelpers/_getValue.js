var getValue = function(param, url) {
    if (url === undefined) {
        url = window.location.href;
    }
    var parameter =
        getParameterByName(param) != null ?
        getParameterByName(param) :
        getCookie(param);
    if (parameter === undefined || parameter === false || parameter === null) {
        return "";
    } else {
        return parameter;
    }
};