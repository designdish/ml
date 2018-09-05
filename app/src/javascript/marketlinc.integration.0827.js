var currentDomain = window.location.hostname;
var mlp = ["lae_vid", "lae_eg", "ml_eg", "ml_acc", "ml_count", "pid", "tempPid"];
var cCount = 0;
var tvURL = "teamviewer.com";
var tvUSURL = "teamviewer.us";
var wwwDomain = "/;domain=." + currentDomain;



var integrateMarketLinc = function() {
    var lae_vidCookie, us_lae_vidCookie, old_lae_vidCookie;

    var newPid;
    waitFor(window.setPid).then(function(){
        newPid = setPid();
    })
    

    if (getCookie("ml_eg") === false) {
        setCookie("ml_eg", "DIRECT");
    }

    if (currentDomain.indexOf(tvUSURL) != -1) {
        integrateMarketLincUS(newPid);
    }

    if (currentDomain.indexOf(tvURL) != -1) {
        integrateMarketLincGlobal(newPid);
    }
};

integrateMarketLinc();