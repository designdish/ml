var currentDomain = window.location.hostname;
var mlp = ["lae_vid", "lae_eg", "ml_eg", "ml_acc", "ml_count", "pid", "tempPid"];
var cCount = 0;
var tvURL = "teamviewer.com";
var tvUSURL = "teamviewer.us";
var wwwDomain = "/;domain=." + currentDomain;



var integrateMarketLinc = function() {
    var newPid;

    if (getCookie("ml_eg") === false) {
        setCookie("ml_eg", "DIRECT");
    }

    newPid = setPid();

    if (currentDomain.indexOf(tvUSURL) != -1) {
        integrateMarketLincUS(newPid);
    }

    if (currentDomain.indexOf(tvURL) != -1) {
        integrateMarketLincGlobal(newPid);
    }
};

waitFor(window.setPid).then(integrateMarketLinc);
