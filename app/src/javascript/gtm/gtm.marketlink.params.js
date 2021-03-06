(function() {
	var getParameterByName = function(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return "";
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	};

	var checkParams = function(url, arr) {
		for (var i = arr.length - 1; i >= 0; i--) {
			var param = arr[i];
			var paramVal = getParameterByName(param, url);

			if (paramVal === null) {
				paramVal = getCookie(param);
				if (paramVal === false) {
					// if no parameter is present in the url, set the cookie and the parameter value to default
					setCookie(param, "");
					paramVal = getCookie(param);
				}
				//append the newly created parameter to the url
				url = appendParam(url, param, paramVal);
			} else {
				// if a parameter value is present in the url, reset the cookie to reflect the parameter value
				setCookie(param, paramVal);
				url = updateParam(url, param, paramVal);
			}
		}
		return url;
	};

	var updateParam = function(url, param, paramVal) {
		var newURL, tempArray, baseURL, additionalURL, temp;

		newURL = "";
		tempArray = url.split("?");
		baseURL = tempArray[0];
		additionalURL = tempArray[1];
		temp = "";

		if (additionalURL) {
			tempArray = additionalURL.split("&");
			for (var i = 0; i < tempArray.length; i++) {
				// setCookie(param, paramVal);
				if (tempArray[i].split("=")[0] != param) {
					newURL += temp + tempArray[i];
					temp = "&";
				}
			}
		}
		var paramText = temp + "" + param + "=" + paramVal;
		return baseURL + "?" + newURL + paramText;
	};

	var updateJoinedParameters = function(joinValue, param, paramVal) {
		newParam = "";
		tempArray = joinValue.replace(" ", "").split("-");
		baseParam = tempArray[0];
		additionalParam = tempArray[1];
		temp = "";

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

	var appendParam = function(url, param, paramVal) {
		// check for the presence of a query initiator and inject one into the url if it isn't, otherwise chain the parameters with the connector
		var newLink =
			url.indexOf("?") != -1
				? url + "&" + param + "=" + paramVal
				: url + "?" + param + "=" + paramVal;
		return newLink;
	};

	var getValue = function(param) {
		var parameter =
			getParameterByName(param) != null
				? getParameterByName(param)
				: getCookie(param);
		if (
			parameter === undefined ||
			parameter === false ||
			parameter === null
		) {
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
			//for each parameter in our target parameter array, check for a parameter or a cookie
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
				url = appendParam(url, target, targetVal);
				if (targetVal === "") {
					setCookie(target, "empty");
				}
			} else {
				updateParam(url, target, targetVal);
			}
			setCookie(target, targetVal);
		}
		setCookie(baseParam, newParamVal);

		result = updateParam(url, baseParam, newParamVal);

		return result;
	};

	var today = new Date();
	var setCookie = function(cName, cValue, cExpires, cPath) {
		if (!cPath) {
			//sets cookies to default to all subdomains
			var domain =
				"/;domain=" + window.location.hostname.replace("www", "");
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

		return cValue;
	};

	var updateCookie = function(cName, cValue) {
		var expireDate =
			document.cookie.indexOf(cName) === -1
				? new Date(
						new Date().setTime(
							new Date().getTime() + 30 * 24 * 3600 * 1000
						)
				  )
				: unescape(document.cookie).split("expireDate=")[1];
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
		return cValue;
	};

	var updateURL = function(params, str, joinParams) {
		var links = document.querySelectorAll("a");
		var currentPage = window.location.href;

		for (var i = 0; links.length > i; i++) {
			var link = links[i];
			var linkURL = link.href;
			// for (var k = str.length - 1; k >= 0; k--) {

			if (
				linkURL.indexOf(str) != -1 &&
				linkURL.indexOf("mailto") === -1
			) {
				link.href = checkParams(currentPage, params);

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

	var mlp = ["lae_vid", "lae_eg", "ml_eg", "ml_acc", "ml_count"];
	var tvURL = "teamviewer.com";
	updateURL(mlp, tvURL, ["pid", mlp]);
})();
