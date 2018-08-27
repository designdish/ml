var load = (function() {
        function _load(tag) {
            return function(url) {
                return new Promise(function(resolve, reject) {
                    var element = document.createElement(tag);
                    var parent = "body";
                    var attr = "src";
                    element.onload = function() {
                        console.log(url + " loaded @ " + today);
                        resolve(url);
                    };
                    element.onerror = function() {
                        console.log(url + " pending @ " + today);
                        waitFor(url);
                    };
                    switch (tag) {
                        case "script":
                            element.async = true;
                            break;
                        case "link":
                            element.type = "text/css";
                            element.rel = "stylesheet";
                            attr = "href";
                            parent = "head";
                    }

                    element[attr] = url;
                    document[parent].appendChild(element);
                });
            };
        }

        return {
            css: _load("link"),
            js: _load("script"),
            img: _load("img")
        };
    })(),
    waitFor = function(url) {
        return new Promise(function(resolve) {
            setTimeout(function() {
                resolve(url);
            }, 500);
        });
    };