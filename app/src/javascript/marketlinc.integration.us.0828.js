var integrateMarketLincUS = function(param){
    waitFor(window.setPid).then(setPid());
    waitFor(window.initLinks).then(initLinks(mlp, tvURL, mlp));
	
	copyCookie("lae_vid","Old_lae_vid");

    if (getCookie("ml_eg") === false) {
        setCookie("ml_eg", "DIRECT");
    }
};