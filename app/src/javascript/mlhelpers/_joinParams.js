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

            // setCookie(baseParam, newParamVal);


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