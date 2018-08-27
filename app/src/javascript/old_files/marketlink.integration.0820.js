var currentDomain = window.location.hostname;

var mlp = ["lae_vid", "lae_eg", "ml_eg", "ml_acc", "ml_count"];
var cCount = 0;
var tvURL = "teamviewer.com";
var tvUSURL = "teamviewer.us";

var today = new Date();

var getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    // console.dir("getting value for " + name + " (using getParameterByName)");
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var addEvent = function(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
};

var isEqual = function(value, other) {
    var type = Object.prototype.toString.call(value);
    if (type !== Object.prototype.toString.call(other)) return false;
    if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;
    var valueLen =
        type === "[object Array]" ? value.length : Object.keys(value).length;
    var otherLen =
        type === "[object Array]" ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    var compare = function(item1, item2) {
        var itemType = Object.prototype.toString.call(item1);
        if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2)) return false;
        } else {
            if (itemType !== Object.prototype.toString.call(item2))
                return false;
            if (itemType === "[object Function]") {
                if (item1.toString() !== item2.toString()) return false;
            } else {
                if (item1 !== item2) return false;
            }
        }
    };

    if (type === "[object Array]") {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false;
            }
        }
    }
    return true;
};

var checkParams = function(url, arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        var param = arr[i];
        var paramVal = getValue(param);

        if (paramVal === null) {
            paramVal = getCookie(param);
            url = appendParam(url, param, paramVal);
        } else {
            setCookie(param, paramVal);
            url = updateParam(url, param, paramVal);
        }
    }
    return url;
};

var eraseCookie = function(cName) {
    document.cookie = name + "=; Max-Age=-99999999;";
};

var logCookie = function(cName, cValue) {
    console.log("cookie name: " + cName + " | cookie value: " + cValue);
};

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
    var paramText = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newURL + paramText;
};

var splitArray = function(str, delimiter) {
    result = {};

    str.split(delimiter).forEach(function(x) {
        var arr = x.split("~");
        arr[1] && (result[arr[0]] = arr[1]);
    });

    var pArray = Object.keys(result).map(function(key) {
        return { param: key, val: result[key] };
    });

    return pArray.sort();
};

Array.prototype.unique = function() {
    var a = this.concat();
    for (var i = 0; i < a.length; i++) {
        for (var j = i + 1; j < a.length; j++) {
            if (a[i] === a[j]) a.splice(j--, 1);
        }
    }
    return a;
};

var compareParams = function(param1, param2, delimiter) {
    var arr1 = splitArray(param1, delimiter);
    var arr2 = splitArray(param2, delimiter);

    var arr3 = arr1.concat(arr2).unique();
    console.dir("merged pid is: " + arr3);

    if (isEqual(arr1, arr2)) {
        console.log("parameters are equal");
        return true;
    } else {
        console.log(arr1 + "\n" + arr2);
    }
};

var updateJoinedParameters = function(joinValue, param, paramVal) {
    var newParam, tempArray, baseParam, additionalParam, temp;
    newParam = "";
    tempArray = joinValue.replace(" ", "").split("-");
    baseParam = tempArray[0];
    additionalParam = tempArray[1];
    temp = "-";

    if (additionalParam) {
        tempArray = additionalParam.split("-");
        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split("~")[0] != param) {
                newParam += temp + tempArray[i];
                temp = "-";
            }
        }
    }

    var paramText = temp + "" + param + "~" + paramVal;
    console.dir(
        "joined parameters " + baseParam + "-" + newParam + "-" + paramText
    );
    return baseParam + "-" + newParam + paramText;
};

var appendParam = function(url, param, paramVal) {
    var newLink =
        url.indexOf("?") != -1 ?
        url + "&" + param + "=" + paramVal :
        url + "?" + param + "=" + paramVal;
    return newLink;
};

var getValue = function(param, url) {
    if (url === undefined) {
        url = window.location.href;
    }
    var parameter =
        getParameterByName(param) != null ?
        getParameterByName(param) :
        getCookie(param);
    if (parameter === undefined || parameter === false || parameter === null) {
        return "";
    } else {
        return parameter;
    }
};

var joinParameters = function(url, baseParam, targetParam) {
    var newParamVal, result, newLink, joinedParams, baseParamVal;

    baseParamVal = getValue(baseParam);
    newParamVal = baseParamVal;

    for (var i = targetParam.length - 1; i >= 0; i--) {
        var target = targetParam[i];
        var targetVal = getValue(targetParam[i]);
        var newParam = target + "=" + targetVal;
        var appendedParam = target + "-" + targetVal;

        if (newParamVal.indexOf(appendedParam) === -1) {
            newParamVal += "-" + appendedParam;
        } else {
            newParamVal = updateJoinedParameters(
                newParamVal,
                target,
                targetVal
            );
            url = updateParam(url, target, targetVal);
        }

        if (url.indexOf(newParam) === -1) {
            if (targetVal != "") {
                url = appendParam(url, target, targetVal);
            }
        } else {
            updateParam(url, target, targetVal);
        }
        if (targetVal != "") {
            console.dir(
                "settingCookie for target: " +
                target +
                " the value (targetVal) is : " +
                targetVal,
                "color: #bada55"
            );
            setCookie(target, targetVal);
        }
        console.dir(
            "settingCookie for baseParam (joinParameters)" +
            target +
            " the value (newParamVal) is : " +
            targetVal
        );
    }
    setCookie(baseParam, newParamVal);


    result = updateParam(url, baseParam, newParamVal);

    return result;
};

var setCookie = function(cName, cValue, cExpires, cPath) {
    if (!cPath) {
        var domain =
            "/;domain=" + window.location.hostname.match(/[^\.]*\.[^.]*$/)[0];
        cPath = domain;
    }
    if (!cExpires) {
        cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
    }
    document.cookie =
        cName +
        "=" +
        cValue +
        ";expires=" +
        cExpires.toGMTString() +
        "; path=" +
        cPath;

    cCount++;
    console.dir(
        "the cookie value for " +
        cName +
        " was the number " +
        cCount +
        " cookie manipulated since pageload"
    );
    return cValue;
};

var updateCookie = function(cName, cValue) {
    var expireDate =
        document.cookie.indexOf(cName) === -1 ?
        new Date(
            new Date().setTime(
                new Date().getTime() + 30 * 24 * 3600 * 1000
            )
        ) :
        unescape(document.cookie).split("expireDate=")[1];
    document.cookie =
        cName +
        "=" +
        cValue +
        ",expireDate=" +
        expireDate +
        ";expires=" +
        expireDate;
};

var getCookie = function(cName) {
    var cStr = document.cookie;

    var startSlice = cStr.indexOf(cName + "=");
    if (startSlice == -1) {
        return false;
    }

    var endSlice = cStr.indexOf(";", startSlice + 1);
    if (endSlice == -1) {
        endSlice = cStr.length;
    }

    var cData = cStr.substring(startSlice, endSlice);
    var cValue = cData.substring(cData.indexOf("=") + 1, cData.length);
    console.dir(cName + " value is now " + cValue);
    return cValue;
};

var updateURLs = function(params, str, joinParams) {
    var links = document.querySelectorAll("a");
    var currentPage = window.location.href;

    for (var i = 0; links.length > i; i++) {
        var link = links[i];
        var linkURL = link.href;

        if (
            linkURL.indexOf(str) != -1 &&
            linkURL.indexOf("mailto") === -1 &&
            linkURL.indexOf("#") === -1
        ) {
            if (joinParams != undefined) {
                link.href = joinParameters(
                    linkURL,
                    joinParams[0],
                    joinParams[1]
                );
            }
            console.log(link.href);
        }
    }
};

var initLinks = function(params, str, joinParams) {
    var links = document.querySelectorAll("a");
    for (var i = links.length - 1; i >= 0; i--) {
        var link = links[i];
        addEvent(link, "click", function(event) {
            if (!samePageNavigation(link)) {
                event.preventDefault();
                updateLink(params, str, joinParams, event);
            }
        });
    }
};

var getClosest = function(el, selector) {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (
                        this.document || this.ownerDocument
                    ).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    for (; el && el !== "document"; el = el.parentNode) {
        if (el.matches(selector)) {
            return el;
        }
    }
    return null;
};

var samePageNavigation = function(url) {
    if (url.pathname === window.location.pathname && url.hash != "") {
        return true;
    }
    return false;
};

var updateLink = function(params, str, joinParams, event) {
    var link = event.target;
    link = getClosest(link, "a");
    linkURL = link.href;

    var currentPage = window.location.href;

    if (linkURL.indexOf(str) != -1 && linkURL.indexOf("mailto") === -1) {
        link.href = checkParams(currentPage, params);

        if (joinParams != undefined) {
            link.href = joinParameters(linkURL, joinParams[0], joinParams[1]);
        }
    }
    console.dir(link.href);
    window.location = link.href;
};

var checkLinkParams = function(link, params){
     if (linkURL.indexOf(str) != -1 && linkURL.indexOf("mailto") === -1) {
        link.href = checkParams(currentPage, params);

        if (joinParams != undefined) {
            link.href = joinParameters(linkURL, joinParams[0], joinParams[1]);
        }
    }
}

var joinParameters = function(str joinParameters)

var syncCookies = function(cName) {
    var absValue;
    if (typeof cName === "object") {
        for (var i = 0; i < cName.length; i++) {
            absValue = getValue(cName[i]);
            if (absValue != getCookie(cName[i])) {
                setCookie(cName[i], absValue);
            }
        }
    } else {
        absValue = getValue(cName);
        if (absValue != getCookie(cName)) {
            setCookie(cName, absValue);
        }
    }
};

var appendParamValues = function(baseParam, params) {
    var currentParamVal = getParameterByName(baseParam);
    var newParamVal = "-";

    for (var i = 0; i < params.length; i++) {
        var parameter = params[i];
        var pVal = getValue(parameter);

        if (params.indexOf(parameter) === 0) {
            newParamVal = "";
            newParamVal += parameter + "~" + pVal + "-";
        } else if (params.indexOf(parameter) < params.length) {
            newParamVal += parameter + "~" + pVal + "-";
        } else {
            newParamVal += parameter + "~" + pVal;
        }
    }

    if (currentParamVal != newParamVal && currentParamVal != null) {
        newParamVal = updateJoinedParameters(
            currentParamVal,
            baseParam,
            newParamVal
        );
    }

    return newParamVal;
};

var newPID = appendParamValues("pid", mlp);
var pidCookie = getCookie("pid");

if (currentDomain.indexOf(tvUSURL) != -1) {
    initLinks(mlp, tvURL, ["pid", mlp]);

    console.log(getCookie("pid"));

    if (getCookie("lae_vid") != false) {
        old_lae_vid = getCookie("lae_vid");
        setCookie("Old_lae_vid", old_lae_vid);
    }

    if (getCookie("pid") === false) {
        setCookie("pid", "PIDEFAULT");
    }

    if (getCookie("ml_eg") === false) {
        setCookie("ml_eg", "DIRECT");
    }
    if (currentDomain.indexOf(tvURL) != -1) {
        if (getParameterByName("lae_vid") != null) {
            syncCookies(mlp);
        }
    }
}

if (currentDomain.indexOf(tvURL) != -1) {
    var buyLink = "newtvorder.aspx";

    if (getCookie("lae_vid") != false) {
        old_lae_vid = getCookie("lae_vid");
        setCookie("Old_lae_vid", old_lae_vid);
    }

    if (getParameterByName("lae_vid") != null) {
        syncCookies(mlp);
    }

    

    waitFor(window.liveagentExt).then(function() {
        if (pidCookie != false && newPID != null) {
            compareParams(pidCookie, newPID, "-");
        }

        if (pidCookie != newPID && pidCookie != false) {
            console.dir(
                "pid cookie is not correct, attempting to set latest pid value of :" +
                newPID
            );
            setCookie("pid", newPID);
        } else {
            console.dir("settingCookie for pid the value is : " + newPID);
            setCookie("pid", newPID);
        }

        initLinks(mlp, buyLink, ["pid", mlp]);

    });
}