var setPid = function() {
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

    var tempClosing = "-pidEnd-";
    if (pidBase === null) {
        pidBase = "";
    }
    if (pidBase != "") {
        pid = pidBase;
        if (ENVisitCommercialScore != false || PageVisitCommercialScore != false) {
            if (ENVisitCommercialScore.indexOf(pidBase) != -1 || (PageVisitCommercialScore.indexOf(pidBase) != -1)) {
                tempPid = tempPid.substring(0, tempPid.indexOf(tempClosing));
            }
        }
    } else {
        pid = pidBase;
    }


    pidParam = '-pid-' + pidBase + '-ml_count-' + ml_count + '-ml_acc-' + ml_acc + '-ml_eg-' + ml_eg + '-lae_eg-' + lae_eg + '-lae_vid-' + lae_vid + tempPid;


    if (getCookie('pid') !== pidParam) {
        var cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
        var wwwDomain = "/;domain=" + window.location.hostname;
        setCookie('pid', pidParam);
        setCookie('pid', pidParam, cExpires, "/");
    }

    return (pidParam);
};