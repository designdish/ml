var integrateMarketLincUS = function(){
    waitFor(window.setPid).then(setPid());
    waitFor(window.initLinks).then(initLinks(mlp, tvURL, mlp));

    console.log(getCookie("pid"));

    if (getCookie("lae_vid") != false) {
        old_lae_vid = getCookie("lae_vid");
        setCookie("Old_lae_vid", old_lae_vid);
    }

    if (getCookie("ml_eg") === false) {
        setCookie("ml_eg", "DIRECT");
    }
}