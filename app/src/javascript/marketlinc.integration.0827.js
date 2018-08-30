var currentDomain = window.location.hostname;
var mlp = ["lae_vid", "lae_eg", "ml_eg", "ml_acc", "ml_count","pid"];
var cCount = 0;
var tvURL = "teamviewer.com";
var tvUSURL = "teamviewer.us";
var pidCookie;
var newPid;
var pidParameter;

var integrateMarketLinc = function() {
    pidCookie = getCookie("pid");
    pidParameter = getParameterByName("pid");

    newPid = setPid();
    if (getCookie("ml_eg") === false) {
        setCookie("ml_eg", "DIRECT");
    }

    if (getCookie("lae_vid") != false) {
        old_lae_vid = getCookie("lae_vid");
        setCookie("Old_lae_vid", old_lae_vid);
    }

    if (currentDomain.indexOf(tvUSURL) != -1){
        integrateMarketLincUS();
    }

     if (currentDomain.indexOf(tvURL) != -1){
        integrateMarketLincGlobal();
    }
    
};

setTimeout(integrateMarketLinc, 1000);