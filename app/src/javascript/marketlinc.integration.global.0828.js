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
     var mlValues = ["ml_eg", "ml_count", "lae_eg", "ml_acc", "lae_vid"];

     for (i = 0; mlValues.length > i; i++) {
         p = getValue(mlValues[i]);
         if (p != false && p != null && p != "") {
             setCookie(mlValues[i], p);
         }
     }

     // on click, pass through the pid cookie as a parameter, appended to the url 

     waitFor(window.liveagentExt).then(function() {
         copyCookie("lae_vid", "Old_lae_vid");
         setPid();
         waitFor(window.initLinks).then(initLinks(mlp, buyLink, mlp));
     });
 };