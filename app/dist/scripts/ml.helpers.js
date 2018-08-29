var addEvent = function(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
};
var splitArray = function(str, delimiter) {
    result = {};

    str.split(delimiter).forEach(function(x) {
        var arr = x.split("-");
        arr[1] && (result[arr[0]] = arr[1]);
    });

    var pArray = Object.keys(result).map(function(key) {
        return { param: key, val: result[key] };
    });

    return pArray.sort();
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
var samePageNavigation = function(url) {
    if ((url.pathname === window.location.pathname && url.hash != "") || (url = "")) {
        return true;
    }
    return false;
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

var trimParam = function(param, str) {
    var trimmedParam = param.substring(0, param.indexOf(str));
    return trimmedParam;
};

var appendParam = function(url, param, paramVal) {
    var newLink =
        url.indexOf("?") != -1 ?
        url + "&" + param + "=" + paramVal :
        url + "?" + param + "=" + paramVal;
    return newLink;
};
var appendParamValues = function(baseParam, params) {
    var currentParamVal = getParameterByName(baseParam);
    var newParamVal = "-";

    for (var i = 0; i < params.length; i++) {
        var parameter = params[i];
        var pVal = getValue(parameter);

        if (params.indexOf(parameter) === 0) {
            newParamVal = "";
            newParamVal += parameter + "-" + pVal + "-";
        } else if (params.indexOf(parameter) < params.length) {
            newParamVal += parameter + "-" + pVal + "-";
        } else {
            newParamVal += parameter + "-" + pVal;
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

var checkParams = function(url, arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        var param = arr[i];
        var paramVal = getValue(param);

        if (paramVal.indexOf('-pidEnd-') != -1) {
            paramVal = trimParam(paramVal, '-pidEnd-');
        }
        if (paramVal === null) {
            paramVal = getCookie(param);
            url = appendParam(url, param, paramVal);
        } else {
            // setCookie(param, paramVal);
            url = updateParam(url, param, paramVal);
        }
    }
    return url;
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
var joinParameters = function(url, baseParam, targetParam) {
    var newParamVal, result, newLink, joinedParams, baseParamVal;

    var target, targetVal, newParam, appendedParam;

    baseParamVal = getValue(baseParam);
    newParamVal = baseParamVal;
    if (targetParam instanceof Array) {
        for (var i = targetParam.length - 1; i >= 0; i--) {
            target = targetParam[i];
            targetVal = getValue(targetParam[i]);
            newParam = target + "=" + targetVal;
            appendedParam = target + "-" + targetVal;

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

            setCookie(baseParam, newParamVal);


            result = updateParam(url, baseParam, newParamVal);

        }
    } else {
        target = targetParam;
        targetVal = getValue(targetParam);
        newParam = target + "=" + targetVal;
        appendedParam = target + "-" + targetVal;

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
    }
    return result;

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
            if (tempArray[i].split("-")[0] != param) {
                newParam += temp + tempArray[i];
                temp = "-";
            }
        }
    }

    var paramText = temp + "" + param + "-" + paramVal;
    return baseParam + "-" + newParam + paramText;
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
    return cValue;
};
var eraseCookie = function(cName) {
};    document.cookie = name + "=; Max-Age=-99999999;";

var logCookie = function(cName) {
    console.log("---- cookie name: " + cName + " | cookie value: " + getCookie(cName) + "-------------- timestamp: " +
        today.getTime());
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
var syncCookies = function(cName) {
    var absValue;
    if (typeof cName === "object") {
        for (var i = 0; i < cName.length; i++) {
            absValue = getValue(cName[i]);
            if (absValue != getCookie(cName[i])) {
                setCookie(cName[i], absValue);
                setCookie(cName[i], absValue, '', '/');
            }
        }
    } else {
        absValue = getValue(cName);
        if (absValue != getCookie(cName)) {
            setCookie(cName, absValue);
            setCookie(cName[i], absValue, '', '/');
        }
    }
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
var initLinks = function(params, str, joinParams) {
    var links = document.querySelectorAll("a");
    for (var i = links.length - 1; i >= 0; i--) {
        var link = links[i];
        addEvent(link, "click", function(event) {
            if (!samePageNavigation(link)) {
                event.preventDefault();
                if (joinParams != undefined) {
                    updateLink(params, str, event);
                } else {
                    updateLink(params, str, event);
                }
            }
        });
    }
};
var updateLink = function(params, str, event) {
    var link = event.target;
    link = getClosest(link, "a");
    linkURL = link.href;

    var currentPage = window.location.href;
    var currentParams = window.location.search;
    if (linkURL.indexOf(str) != -1 && linkURL.indexOf("mailto") === -1) {
        link.href = checkParams(linkURL, params);
        window.location = link.href;

    } else if (linkURL.indexOf(str) === -1) {
        window.location = link.href + currentParams;
    }
};

var load = (function() {
        function _load(tag) {
            return function(url) {
                return new Promise(function(resolve, reject) {
                    var element = document.createElement(tag);
                    var parent = "body";
                    var attr = "src";
                    element.onload = function() {
                        console.log(url + " loaded @ " + today);
                        resolve(url);
                    };
                    element.onerror = function() {
                        console.log(url + " pending @ " + today);
                        waitFor(url);
                    };
                    switch (tag) {
                        case "script":
                            element.async = true;
                            break;
                        case "link":
                            element.type = "text/css";
                            element.rel = "stylesheet";
                            attr = "href";
                            parent = "head";
                    }

                    element[attr] = url;
                    document[parent].appendChild(element);
                });
            };
        }

        return {
            css: _load("link"),
            js: _load("script"),
            img: _load("img")
        };
    })(),
    waitFor = function(url) {
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(url);
            }, 500);
        });
    };

var setPid = function(str) {

    var pidBase = getParameterByName('pid'),
        ml_eg = getValue('ml_eg'),
        ml_count = getValue('ml_count'),
        lae_eg = getValue('lae_eg'),
        ml_acc = getValue('ml_acc'),
        lae_vid = getValue('lae_vid'),
        pidTime = today.getTime(),
        ENVisitCommercialScore = getCookie('ENVisitCommercialScore'),
        PageVisitCommercialScore = getCookie('PageVisitCommercialScore'),
        tempPid = getParameterByName('pid', ENVisitCommercialScore),

        pidParam, pid;

        if(str = undefined){
            str = pidBase;
        }
    
    var tempClosing = "-pidEnd-";
    if (pidBase === null) {
        pidBase = "";
    }
    if (pidBase != "") {
        setCookie('passed_pid_parameter', pidBase);
        pid = pidBase;
        if (ENVisitCommercialScore != false || PageVisitCommercialScore != false) {
            if (ENVisitCommercialScore.indexOf(pidBase) != -1 || (PageVisitCommercialScore.indexOf(pidBase) != -1)) {
                tempPid = getParameterByName('pid', ENVisitCommercialScore),
                    tempClosing =tempPid.substring(0, tempPid.indexOf(tempClosing));
            }
        }
    } else {
        pid = pidBase;
    }

    var pidRoot = getParameterByName('pid');
    
    if (pidBase.indexOf(pidRoot) != -1){
        pidParam = '-pid-' + pidBase + '-ml_count-' + ml_count + '-ml_acc-' + ml_acc + '-ml_eg-' + ml_eg + '-lae_eg-' + lae_eg + '-lae_vid-' + lae_vid + tempClosing;
    }
    // pidParam = pidParam.substring(0, pidParam.indexOf(tempClosing));

    if (getCookie('pid') !== pidParam) {
        var cExpires = new Date(today.getTime() + 30 * 24 * 3600 * 1000);
        var wwwDomain = "/;domain=" + window.location.hostname;
        setCookie('pid', pidParam);
        setCookie('pid', pidParam, cExpires, "/");
        setCookie('pid', pidParam, cExpires, "." + wwwDomain);

    }

    return (pidParam);
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
        }
    }
};