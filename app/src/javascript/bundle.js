var helperCDN = "https://rawgit.com/designdish/ml/marketlink/app/src/javascript/mlhelpers/";
var distCDN = "https://rawgit.com/designdish/ml/marketlink/app/src/javascript/";
var today = new Date();

var buildUrl = function(cdn, file) {
    var url = cdn + file;
    return url;
};

var loadBundle =

    // load helper functions
    Promise.all([
        load.js(buildUrl(helperCDN, "_addEvent.js")),
        load.js(buildUrl(helperCDN, "_splitArray.js")),
        load.js(buildUrl(helperCDN, "_isEqual.js")),
        load.js(buildUrl(helperCDN, "_samePageNavigation.js")),
        load.js(buildUrl(helperCDN, "_getClosest.js")),
        load.js(buildUrl(helperCDN, "_checkStringForSubstrings.js")),
        // console.log("global helpers loaded @ " + today)
    ]).then(

        // load parameter functions
        Promise.all([
            load.js(buildUrl(helperCDN, "_getParams.js")),
            load.js(buildUrl(helperCDN, "_trimParam.js")),
            load.js(buildUrl(helperCDN, "_appendParam.js")),
            load.js(buildUrl(helperCDN, "_appendParamValues.js")),
            load.js(buildUrl(helperCDN, "_checkParams.js")),
            load.js(buildUrl(helperCDN, "_compareParams.js")),
            load.js(buildUrl(helperCDN, "_joinParams.js")),
            load.js(buildUrl(helperCDN, "_updateJoinedParams.js")),
            load.js(buildUrl(helperCDN, "_updateParams.js")),
            // console.log("param helpers loaded @ " + today)
        ])).then(

        // load cookie functions
        Promise.all([
            load.js(buildUrl(helperCDN, "_getCookie.js")),
            load.js(buildUrl(helperCDN, "_eraseCookie.js")),
            load.js(buildUrl(helperCDN, "_logCookie.js")),
            load.js(buildUrl(helperCDN, "_setCookie.js")),
            load.js(buildUrl(helperCDN, "_updateCookie.js")),
            load.js(buildUrl(helperCDN, "_syncCookies.js")),
            load.js(buildUrl(helperCDN, "_copyCookie.js")),
            // console.log("cookie helpers loaded @ " + today)
        ])).then(

        // load value functions
        Promise.all([
            load.js(buildUrl(helperCDN, "_getValue.js")),
            load.js(buildUrl(helperCDN, "_initLinks.js")),
            load.js(buildUrl(helperCDN, "_updateLink.js")),
            // console.log("value helpers loaded @ " + today)
        ])).then(

        // load partner id functions
        Promise.all([
            load.js(buildUrl(helperCDN, "_setPid.js")),
            // console.log("pid helpers loaded @ " + today)
        ])).then(

        // load integration of functions into application
        Promise.all([
            load.js(buildUrl(distCDN, "marketlinc.integration.us.0828.js")),
            load.js(buildUrl(distCDN, "marketlinc.integration.global.0828.js")),
            load.js(buildUrl(distCDN, "marketlinc.integration.0827.js")),
            // console.log("integration helpers loaded @ " + today)
        ])
    );