var checkStringForSubs = function(str, sub){
	if(typeof(str) === "string"){
	    length = sub.length;
	    while(length--){
	        if (str.indexOf(sub[length]) != -1){
	            return true;
	        }
	    }
	}
    return false; 
};