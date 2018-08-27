var updateCookie = function(cName, cValue) {
    var expireDate =
        document.cookie.indexOf(cName) === -1 ?
        new Date(
            new Date().setTime(
                new Date().getTime() + 30 * 24 * 3600 * 1000
            )
        ) :
        unescape(document.cookie).split("expireDate=")[1];
    document.cookie =
        cName +
        "=" +
        cValue +
        ",expireDate=" +
        expireDate +
        ";expires=" +
        expireDate;
};