var updateLink = function(params, str, joinParams, event) {
    var link = event.target;
    link = getClosest(link, "a");
    linkURL = link.href;

    var currentPage = window.location.href;

    if (linkURL.indexOf(str) != -1 && linkURL.indexOf("mailto") === -1) {
        link.href = checkParams(currentPage, params);
        // if(joinParameters = undefined){
        //     link.href = 
        // }
        if (joinParams != undefined) {
            link.href = joinParameters(linkURL, joinParams[0], joinParams[1]);
        }
    }
    console.dir(link.href);
    window.location = link.href;
};