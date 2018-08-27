var samePageNavigation = function(url) {
    if ((url.pathname === window.location.pathname && url.hash != "") || (url = "")) {
        return true;
    }
    return false;
};