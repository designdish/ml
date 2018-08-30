var checkStringForSubs = function(str, sub){
    length = sub.length;
    while(length--){
        if (str.indexOf(sub[length]) != -1){
            return true;
        }
    }
    return false; 
};