var setPid = function(str) {
    // this could be the cookie or a passed parameter
    var passedPid = function() {
        var p, tmp, pd;
        tmp = getValue("tempPid");
        pd = getValue("pid");

        if (currentDomain.indexOf(tvURL) != -1) {
            p = (tmp != "") ? tmp : pd;
        } else if (currentDomain.indexOf(tvUSURL) != -1) {
            p = (pd != "") ? pd : tmp;
        } else {
            p = "";
        }
        if ((p === false) || (p === undefined)) {
            p = "";
        }
        if (p.indexOf('-pid-') != -1) {
            p = "";
        }
        return p;
    };


    var passedPidParameter = passedPid();
    var ml_eg = getValue("ml_eg"),
        ml_count = getValue("ml_count"),
        lae_eg = getValue("lae_eg"),
        ml_acc = getValue("ml_acc"),
        lae_vid = getValue("lae_vid"),
        tempClosing = "-pidEnd-",
        pidCookie = getCookie("pid"),
        pidParameter = getParameterByName("pid"),
        pidParam,
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
            //pidParam ="-pid-" + passedPidParameter + mlString + tempClosing;
            console.log(
                "pid cookie and parameter have been mutated and are equal"
            );
            setTempPid();
        } else {
            console.log("pid cookie is not equal to pid parameter");
            if (pidParameterMutation === false || pidCookieMutation === false) {
                console.log("neither pid parameter or cookie has not been mutated");
                pidParam = "-pid-" + passedPidParameter + mlString + tempClosing;
            }
            if (pidParameterMutation === true || pidCookieMutation === false) {
                console.log("pid cookie has not been mutated");
                pidParam = "-pid-" + passedPidParameter + mlString + tempClosing;
            }
            if (pidParameterMutation === false || pidCookieMutation === true) {
                console.log("pid parameter has not been mutated");
                pidParam = "-pid-" + passedPidParameter + mlString + tempClosing;
            }
            setTempPid();
            setDupCookies();

        }
    } else {
        pidParam = "-pid-" + passedPidParameter + mlString + tempClosing;
        setTempPid();
        //let's see if this breaks anything...
        setDupCookies();
    }

    function setTempPid() {

        if (currentDomain.indexOf(tvURL) != -1) {
            var USPid = getParameterByName('tempPid');
            if (USPid !== null) {
                setCookie("tempPid", USPid);
            }
        } else {
            setCookie("tempPid", passedPidParameter);
        }
    }

    function setDupCookies() {
        if (getCookie("pid") !== pidParam && pidParam != undefined) {
            var cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
            var wwwDomain = "/;domain=" + window.location.hostname;
            setCookie("pid", pidParam);
            setCookie("pid", pidParam, cExpires, "/");
            // setCookie('pid', pidParam, cExpires, "." + wwwDomain + "/");
        }
    }

    return pidParam;
};