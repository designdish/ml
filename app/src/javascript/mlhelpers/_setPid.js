var setPid = function() {
    var pidBase = getParameterByName('pid'),
        ml_eg = getValue('ml_eg'),
        ml_count = getValue('ml_count'),
        lae_eg = getValue('lae_eg'),
        ml_acc = getValue('ml_acc'),
        lae_vid = getValue('lae_vid'),
        pidParam, pid;


    if (pidBase === undefined) {
        pidBase = "";
    } else {
        pid = pidBase;
    }


    pidParam = '-pid-' + pid + '-ml_count-' + ml_count + '-ml_acc-' + ml_acc + '-ml_eg-' + ml_eg + '-lae_eg-' + lae_eg + '-lae_vid-' + lae_vid;


    if (getCookie('pid') !== pidParam) {
        setCookie('pid', pidParam);
    }

    return (pidParam);
};