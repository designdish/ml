var setPid = function(str) {

    var pidBase = getParameterByName('pid'),
        ml_eg = getValue('ml_eg'),
        ml_count = getValue('ml_count'),
        lae_eg = getValue('lae_eg'),
        ml_acc = getValue('ml_acc'),
        lae_vid = getValue('lae_vid'),
        pidTime = today.getTime(),
        ENVisitCommercialScore = getCookie('ENVisitCommercialScore'),
        PageVisitCommercialScore = getCookie('PageVisitCommercialScore'),
        tempPid = getParameterByName('pid', ENVisitCommercialScore),

        pidParam, pid;

        if(str = undefined){
            str = pidBase;
        }
    
    var tempClosing = "-pidEnd-";
    if (pidBase === null) {
        pidBase = "";
    }
    if (pidBase != "") {
        setCookie('passed_pid_parameter', pidBase);
        pid = pidBase;
        if (ENVisitCommercialScore != false || PageVisitCommercialScore != false) {
            if (ENVisitCommercialScore.indexOf(pidBase) != -1 || (PageVisitCommercialScore.indexOf(pidBase) != -1)) {
                tempPid = getParameterByName('pid', ENVisitCommercialScore),
                    tempClosing =tempPid.substring(0, tempPid.indexOf(tempClosing));
            }
        }
    } else {
        pid = pidBase;
    }

    var pidRoot = (getParameterByName('pid') === null) ? "" : getParameterByName('pid');
    
    if (pidBase.indexOf(pidRoot) != -1){
        pidParam = '-pid-' + pidBase + '-ml_count-' + ml_count + '-ml_acc-' + ml_acc + '-ml_eg-' + ml_eg + '-lae_eg-' + lae_eg + '-lae_vid-' + lae_vid + tempClosing;
    }

    if (pidBase.indexOf(pidRoot) === -1){
        pidParam = '-pid-' + pidBase + '-ml_count-' + ml_count + '-ml_acc-' + ml_acc + '-ml_eg-' + ml_eg + '-lae_eg-' + lae_eg + '-lae_vid-' + lae_vid + tempClosing;
    }
    // pidParam = pidParam.substring(0, pidParam.indexOf(tempClosing));

    if (getCookie('pid') !== pidParam && pidParam != undefined) {
        var cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
        var wwwDomain = "/;domain=" + window.location.hostname;
        setCookie('pid', pidParam);
        setCookie('pid', pidParam, cExpires, "/");
        setCookie('pid', pidParam, cExpires, "." + wwwDomain);

    }

    return (pidParam);
};