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
    console.dir(
        "joined parameters " + baseParam + "-" + newParam + "-" + paramText
    );
    return baseParam + "-" + newParam + paramText;
};