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
        pidParam, pid;


    if (pidBase === undefined) {
        pidBase = "";
    }
    if (pidBase != undefined) {
        if (ENVisitCommercialScore.indexOf(pidBase) != -1 || (PageVisitCommercialScore.indexOf(pidBase) != -1)) {
            var tempPid = getParameterByName(pidBase, ENVisitCommercialScore);
            tempPid = tempPid.substring(0, tempPid.indexOf('-'));
            pid = tempPid;
        }
    } else {
        pid = pidBase;
    }


    pidParam = '-pid-' + pid + '-ml_count-' + ml_count + '-ml_acc-' + ml_acc + '-ml_eg-' + ml_eg + '-lae_eg-' + lae_eg + '-lae_vid-' + lae_vid + '-time-' + pidTime;


    if (getCookie('pid') !== pidParam) {
        setCookie('pid', pidParam);
    }

    return (pidParam);
};