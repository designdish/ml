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