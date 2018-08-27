var initLinks = function(params, str, joinParams) {
    var links = document.querySelectorAll("a");
    for (var i = links.length - 1; i >= 0; i--) {
        var link = links[i];
        addEvent(link, "click", function(event) {
            if (!samePageNavigation(link)) {
                event.preventDefault();
                if (joinParams != undefined) {
                    updateLink(params, str, event);
                } else {
                    updateLink(params, str, event);
                }
            }
        });
    }
};