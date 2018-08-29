var updateURLs = function(params, str, joinParams) {
    var links = document.querySelectorAll("a");
    var currentPage = window.location.href;

    for (var i = 0; links.length > i; i++) {
        var link = links[i];
        var linkURL = link.href;

        if (
            linkURL.indexOf(str) != -1 &&
            linkURL.indexOf("mailto") === -1 &&
            linkURL.indexOf("#") === -1
        ) {
            if (joinParams != undefined) {
                link.href = joinParameters(
                    linkURL,
                    joinParams[0],
                    joinParams[1]
                );
            }
        }
    }
};