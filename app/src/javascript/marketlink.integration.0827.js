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
        waitFor(window.setPid).then(function(){
         if (getParameterByName('pid')!= null){
                var tempPid = getParameterByName('pid');
                var tempPidCookie = getCookie('pid');
                if (tempPidCookie.indexOf(tempPid) != -1){
                    setPid();
                }else{
                    tempPidCookie = updateJoinedParameters('pid', 'pid', tempPid);
                    setCookie('pid', tempPidCookie, '', '/');
                   setPid();
                }
            }
        }setPid());
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
            waitFor(window.initLinks).then(initLinks(mlp, buyLink));
        });
    }
};

setTimeout(integrateMarketLinc, 1000);