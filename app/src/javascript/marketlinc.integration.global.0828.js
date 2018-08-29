 var matchParam = function (str){
    var param = getParameterByName(str),
        cookie = getCookie(str);
    if (param === cookie){
        return true;
    }
    if (cookie.indexOf(param) != -1){
        return true;
    }
    else{
        return false
    }
};

var integrateMarketLincGlobal = function(){

    var buyLink = "newtvorder.aspx";

    // check for passed parameter

    var pidParam = getParameterByName('pid'); 

    // check for a cookie
    var pidCookie = getCookie('pid');

    // check if the pid cookie is the same as the pid parameter

    var pidMatch = (matchParam('pid'));
   

    var getPidSubParameter = function(str){
        var regex = new RegExp(/(?<=-pid-)(.*)(?=-ml_count)/);
        return regex.exec(str);
    };

    // if the cookie does not match the parameter, update the cookie with the parameter value

    if (pidMatch === false){
        var tempPid = getParameterByName('pid');
        var pastPid = getPidSubParameter(pidCookie);
        tempPid = pidCookie.replace(pastPid, "");
        var newPid = pidParam + pastPid;
        console.log("the new pid is " + newPid);
    };

    // on click, pass through the pid cookie as a parameter, appended to the url 



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

    if (getCookie("lae_vid") != false) {
        old_lae_vid = getCookie("lae_vid");
        setCookie("Old_lae_vid", old_lae_vid);
    }

    // if (getParameterByName("lae_vid") != null) {
    //     syncCookies(mlp);
    // }

    waitFor(window.liveagentExt).then(function() {
        setPid()
        console.log(getCookie("pid"));
        waitFor(window.initLinks).then(initLinks(mlp, buyLink));
    });
};
