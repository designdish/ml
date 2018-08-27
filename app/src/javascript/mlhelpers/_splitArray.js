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