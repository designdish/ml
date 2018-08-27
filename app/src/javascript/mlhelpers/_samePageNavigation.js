var samePageNavigation = function(url) {
    if (url.pathname === window.location.pathname && url.hash != "") {
        return true;
    }
    return false;
};