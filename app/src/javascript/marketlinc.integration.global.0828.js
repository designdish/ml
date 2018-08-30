 var matchParam = function(str) {
     var param = getParameterByName(str),
         cookie = getCookie(str);
     if (param === cookie) {
         return true;
     }
     if (cookie.indexOf(param) != -1) {
         return true;
     } else {
         return false;
     }
 };

 var getPidSubParameter = function(str) {
     var regex = new RegExp(/(?<=-pid-)(.*)(?=-ml_count)/);
     return regex.exec(str);
 };

 var integrateMarketLincGlobal = function(param) {

     var buyLink = "newtvorder.aspx";

     // check for passed parameter

     var pidParam = (getParameterByName('pid') === null) ? "" : getParameterByName('pid');


     // check for a cookie
     var pidCookie = getCookie('pid');

     // check if the pid cookie is the same as the pid parameter

     // var pidMatch = (matchParam('pid'));
     // var pidMatch = isEqual(pidParam, pidCookie);

     // if the cookie does not match the parameter, update the cookie with the parameter value

     // if (pidMatch === false) {
     //     var tempPid = getParameterByName('pid');
     //     var passedPid = getPidSubParameter(pidCookie);
     //     var newPid;
     //     if (passedPid != null) {
     //         tempPid = pidCookie.replace('-pid-' + passedPid[0], "");
     //         newPid = '-pid-' + pidParam + passedPid[0] + tempPid;
     //         console.log("the new pid is " + newPid);
     //     }
     // }

     // on click, pass through the pid cookie as a parameter, appended to the url 

     waitFor(window.liveagentExt).then(function() {
         setPid();
         waitFor(window.initLinks).then(initLinks(mlp, buyLink, mlp));
     });
 };