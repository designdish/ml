var setPid = function(str) {
    // this could be the cookie or a passed parameter
    var passedPidParameter =
        getParameterByName("pid") === null
            ? getCookie("passed_pid_parameter")
            : getParameterByName("pid");
    var ml_eg = getValue("ml_eg"),
        ml_count = getValue("ml_count"),
        lae_eg = getValue("lae_eg"),
        ml_acc = getValue("ml_acc"),
        lae_vid = getValue("lae_vid"),
        tempClosing = "-pidEnd-",
        pidCookie = getCookie("pid"),
        pidParameter = getParameterByName("pid"),
        ENVisitCommercialScore = getCookie("ENVisitCommercialScore"),
        PageVisitCommercialScore = getCookie("PageVisitCommercialScore"),
        tempPid = getParameterByName("pid", ENVisitCommercialScore),
        marketLincValues = [ml_eg, ml_count, lae_eg, ml_acc, lae_vid],
        mlString = "-ml_count-" + ml_count + "-ml_acc-" + ml_acc + "-ml_eg-" + ml_eg + "-lae_eg-" + lae_eg + "-lae_vid-" + lae_vid;
    // this could only be the parameter or nothing
    pidRoot =
        getParameterByName("pid") === null ? "" : getParameterByName("pid");

    if (passedPidParameter === false || passedPidParameter === undefined) {
        passedPidParameter = "";
    }

    if ((str = undefined)) {
        str = passedPidParameter;
    }

    //check for mutation in the parameters and cookies

    var pidCookieMutation = checkStringForSubs(pidCookie, marketLincValues);
    var pidParameterMutation = checkStringForSubs(pidParameter, marketLincValues);

    //check for equality in the parameter and cookie value

    var pidEquality = isEqual(pidCookie, pidParameter);

    if (pidEquality === true) {
        console.log("pid cookie is equal to pid parameter");
        if (pidCookieMutation === true && pidParameterMutation === true) {
            console.log(
                "pid cookie and parameter have been mutated and are equal"
            );
        } else {
            console.log("pid cookie is not equal to pid parameter");
            if (pidParameterMutation === false || pidCookieMutation === false) {
                console.log("neither pid parameter or cookie has not been mutated");
                pidParam ="-pid-" + passedPidParameter + mlString + tempClosing;
                setCookie("tempPid", pidParam);
            }
            if (pidParameterMutation === true || pidCookieMutation === false) {
                console.log("pid cookie has not been mutated");
                pidParam ="-pid-" + passedPidParameter + mlString + tempClosing;
                setCookie("tempPid", pidParam);
            }
            if (pidParameterMutation === false || pidCookieMutation === true) {
                console.log("pid parameter has not been mutated");
                pidParam ="-pid-" + passedPidParameter + mlString + tempClosing;
                setCookie("tempPid", pidParam);
            }
        }
    } else {
        pidParam = "-pid-" + passedPidParameter + mlString + tempClosing;
        setCookie("tempPid", pidParam);
    }

    if (getCookie("pid") !== pidParam && pidParam != undefined) {
        var cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
        var wwwDomain = "/;domain=" + window.location.hostname;
        setCookie("pid", pidParam);
        setCookie("pid", pidParam, cExpires, "/");
        // setCookie('pid', pidParam, cExpires, "." + wwwDomain + "/");
    }

    return pidParam;
};
