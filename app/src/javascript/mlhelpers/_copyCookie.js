var copyCookie = function(cookie1, cookie2){
    if (getCookie(cookie1) != false) {
    var cookie1val = getCookie(cookie1);
	}	
    if (getCookie(cookie2) != false) {
  	var  cookie2val = getCookie(cookie2);
    }
    if (cookie2val != undefined && cookie1val != undefined){
        if (isEqual(cookie2val,cookie1val) === false) {
            setCookie(cookie2, cookie1val);
        }
    }
};