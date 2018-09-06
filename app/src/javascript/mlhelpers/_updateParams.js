var updateParam = function(url, param, paramVal) {
    var newURL, tempArray, baseURL, additionalURL, temp;
    tempArray = url.split("?");
    baseURL = tempArray[0];
    additionalURL = tempArray[1] === undefined ? "" : tempArray[1];
    //         additionalURL = tempArray[1];
    temp = "";

    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split("=")[0] != param) {
                newURL = newURL === undefined ? "" : newURL;
                newURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    var paramText;
    if (paramVal != "") {
        paramText = temp + "" + param + "=" + paramVal;
        return baseURL + "?" + newURL + paramText;

    } else {
        return baseURL + "?" + newURL;
    }
};