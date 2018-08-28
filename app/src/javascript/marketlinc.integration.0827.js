var currentDomain = window.location.hostname;
var mlp = ["lae_vid", "lae_eg", "ml_eg", "ml_acc", "ml_count","pid"];
var cCount = 0;
var tvURL = "teamviewer.com";
var tvUSURL = "teamviewer.us";
var pidCookie = getCookie("pid");

var integrateMarketLinc = function() {
    if (getCookie("ml_eg") === false) {
        setCookie("ml_eg", "DIRECT");
    }

    if (currentDomain.indexOf(tvUSURL) != -1){
        integrateMarketLincUS();
    }

     if (currentDomain.indexOf(tvURL) != -1){
        integrateMarketLincGlobal();
    }
    
};

setTimeout(integrateMarketLinc, 1000);