var helperCDN = "https://rawgit.com/designdish/ml/marketlink/app/src/javascript/mlhelpers/";
var distCDN = "https://rawgit.com/designdish/ml/marketlink/app/src/javascript/";
var today = new Date();

var buildUrl = function(cdn, file) {
    var url = cdn + file;
    return url;
};


// load helper functions

var loadHelpers = Promise.all([
    load.js(buildUrl(helperCDN, "_addEvent.js")),
    load.js(buildUrl(helperCDN, "_splitArray.js")),
    load.js(buildUrl(helperCDN, "_isEqual.js")),
    load.js(buildUrl(helperCDN, "_samePageNavigation.js")),
    load.js(buildUrl(helperCDN, "_getClosest.js")),
    console.log("global helpers loaded @ " + today)
]);


//load parameter functions
var loadParams = Promise.all([
    load.js(buildUrl(helperCDN, "_appendParam.js")),
    load.js(buildUrl(helperCDN, "_appendParamValues.js")),
    load.js(buildUrl(helperCDN, "_checkParams.js")),
    load.js(buildUrl(helperCDN, "_compareParams.js")),
    load.js(buildUrl(helperCDN, "_joinParams.js")),
    load.js(buildUrl(helperCDN, "_updateJoinedParams.js")),
    load.js(buildUrl(helperCDN, "_updateParams.js")),
    console.log("param helpers loaded @ " + today)
]);

// load cookie functions
var loadCookies = Promise.all([
    load.js(buildUrl(helperCDN, "_getCookie.js")),
    load.js(buildUrl(helperCDN, "_eraseCookie.js")),
    load.js(buildUrl(helperCDN, "_logCookie.js")),
    load.js(buildUrl(helperCDN, "_setCookie.js")),
    load.js(buildUrl(helperCDN, "_updateCookie.js")),
    load.js(buildUrl(helperCDN, "_syncCookies.js")),
    console.log("cookie helpers loaded @ " + today)
]);

// put it all together
var loadValues = Promise.all([
    load.js(buildUrl(helperCDN, "_getValue.js")),
    load.js(buildUrl(helperCDN, "_initLinks.js")),
    load.js(buildUrl(helperCDN, "_updateLink.js")),
    console.log("value helpers loaded @ " + today)
]);

// load pid function 
var loadPid = Promise.all([
    load.js(buildUrl(helperCDN, "_setPid.js")),
    console.log("pid helpers loaded @ " + today)
]);


var loadIntegration = Promise.all([
    load.js(buildUrl(distCDN, "marketlink.integration.0827.js")),
    console.log("integration helpers loaded @ " + today)
]);

var loadBundle = function() {
    loadHelpers.then(loadParams).then(loadCookies).then(loadValues).then(loadPid).then(loadIntegration);
};

loadBundle();