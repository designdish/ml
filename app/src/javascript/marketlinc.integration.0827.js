var currentDomain = window.location.hostname;
var mlp = ["lae_vid", "lae_eg", "ml_eg", "ml_acc", "ml_count", "pid", "tempPid"];
var cCount = 0;
var tvURL = "teamviewer.com";
var tvUSURL = "teamviewer.us";
var wwwDomain = "/;domain=." + currentDomain;



var integrateMarketLinc = function() {
    var lae_vidCookie, us_lae_vidCookie, old_lae_vidCookie;
    newPid = setPid();

    if (getCookie("ml_eg") === false) {
        setCookie("ml_eg", "DIRECT");
    }

    //not sure if we need this, but i feel like we will...
    if (getCookie("ml_us_lae_vid") != false) {
        us_lae_vidCookie = getCookie("ml_us_lae_vid");
        lae_vidCookie = getCookie("lae_vid");
        if (isEqual(us_lae_vidCookie, lae_vidCookie) === false) {
            setCookie("lae_vid", us_lae_vidCookie);
        }
    }

    if (getCookie("lae_vid") != false) {
        lae_vidCookie = getCookie("lae_vid");

        if (getCookie("Old_lae_vid") != false) {
            old_lae_vidCookie = getCookie("Old_lae_vid");
        }
        if (isEqual(old_lae_vidCookie, lae_vidCookie) === false) {
            setCookie("Old_lae_vid", old_lae_vidCookie);
        }
    }

    if (currentDomain.indexOf(tvUSURL) != -1) {
        integrateMarketLincUS(newPid);
    }

    if (currentDomain.indexOf(tvURL) != -1) {
        integrateMarketLincGlobal(newPid);
    }
};

setTimeout(integrateMarketLinc, 1000);