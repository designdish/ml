var currentDomain = window.location.hostname;
var mlp = ["pid", "lae_vid", "lae_eg", "ml_eg", "ml_acc", "ml_count"];
var cCount = 0;
var tvURL = "teamviewer.com";
var tvUSURL = "teamviewer.us";
var pidCookie = getCookie("pid");

var integrateMarketLinc = function() {


    if (getCookie("ml_eg") === false) {
        setCookie("ml_eg", "DIRECT");
    }

    if (currentDomain.indexOf(tvUSURL) != -1) {
        waitFor(window.setPid).then(setPid());
        waitFor(window.initLinks).then(initLinks(mlp, tvURL, mlp));

        console.log(getCookie("pid"));

        if (getCookie("lae_vid") != false) {
            old_lae_vid = getCookie("lae_vid");
            setCookie("Old_lae_vid", old_lae_vid);
        }


        if (getCookie("ml_eg") === false) {
            setCookie("ml_eg", "DIRECT");
        }
    }

    if (currentDomain.indexOf(tvURL) != -1) {
        waitFor(window.setPid).then(setPid());
        for (var i = mlp.length - 1; i >= 0; i--) {
            logCookie(mlp[i]);
        }

        var buyLink = "newtvorder.aspx";

        if (getCookie("lae_vid") != false) {
            old_lae_vid = getCookie("lae_vid");
            setCookie("Old_lae_vid", old_lae_vid);
        }

        if (getParameterByName("lae_vid") != null) {
            syncCookies(mlp);
        }

        waitFor(window.liveagentExt).then(function() {

            console.log(getCookie("pid"));
            waitFor(window.initLinks).then(initLinks(mlp, tvURL, mlp));
        });
    }
};

setTimeout(integrateMarketLinc, 1000);