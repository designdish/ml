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
            //     console.dir(
            //         "settingCookie for target: " +
            //         target +
            //         " the value (targetVal) is : " +
            //         targetVal,
            //         "color: #bada55"
            //     );
            //     setCookie(target, targetVal);
            // }
            // console.dir(
            //     "settingCookie for baseParam (joinParameters)" +
            //     target +
            //     " the value (newParamVal) is : " +
            //     targetVal
            // );
        }
        setCookie(baseParam, newParamVal);


        result = updateParam(url, baseParam, newParamVal);

        return result;
    }
};