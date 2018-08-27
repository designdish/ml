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

    var tempTime = "-time-" + pidTime;
    if (pidBase === null) {
        pidBase = "";
    }
    if (pidBase != "") {
        if (ENVisitCommercialScore != false || PageVisitCommercialScore != false) {
            if (ENVisitCommercialScore.indexOf(pidBase) != -1 || (PageVisitCommercialScore.indexOf(pidBase) != -1)) {
                var tempPid = getParameterByName('pid', ENVisitCommercialScore);
                tempPid = tempPid.substring(0, tempPid.indexOf(tempTime));
            }
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