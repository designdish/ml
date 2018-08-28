var integrateMarketLincGlobal = function(){
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

    setPid()

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
};
