//  a list of excluded elements that should not be updated
var excludedLinks = ['firstFlip', 'secondFlip'];

var updateLink = function(params, str, event) {
    var link = event.target;
    link = getClosest(link, "a");
    linkURL = link.href;

    var currentPage = window.location.href;
    var currentParams = window.location.search;
    if (excludedLinks.indexOf(link.id) === -1 && link.href != "") {
        if (linkURL.indexOf(str) != -1 && linkURL.indexOf("mailto") === -1) {
            link.href = checkParams(linkURL, params);
            window.location = link.href;
        } else if (linkURL.indexOf(str) === -1) {
            if (currentDomain.indexOf(tvURL) != -1) {
                window.location = link.href + currentParams;
            } else {
                window.location = link.href;
            }
        }
    }
};