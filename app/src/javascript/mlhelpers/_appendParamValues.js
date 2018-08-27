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