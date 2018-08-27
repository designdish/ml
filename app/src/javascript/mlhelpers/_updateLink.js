var updateLink = function(params, str, updateParams, event) {
    var link = event.target;
    link = getClosest(link, "a");
    linkURL = link.href;

    var currentPage = window.location.href;

    if (linkURL.indexOf(str) != -1 && linkURL.indexOf("mailto") === -1) {
        link.href = checkParams(currentPage, params);
        if (updateParams != undefined) {
            if (updateParams instanceof Array) {
                for (i = 0; i > updateParams.length; i++) {
                    link.href = updateParams(linkURL, updateParams[i], getValue(updateParams));
                }
            } else {
                link.href = updateParams(linkURL, updateParams, getValue(updateParams));
            }
        }
    }
    console.dir(link.href);
    window.location = link.href;
};