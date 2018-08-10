function titleGen() {
	try {
		var title, pageType;
		var url = window.location.origin;
		var path = window.location.pathname.replace(/\//g, " ");

		var subDomain = url.split(".")[0].replace("https://", "");

		switch (subDomain) {
			case "try":
				pageType = "Unbounce Landing Page (try)";
				break;
			case "try":
				pageType = "Unbounce Landing Page (run)";
				break;

			case "content":
				pageType = "TeamViewer Content Page";
				break;
			case "www":
				if (url.indexOf("teamviewer.us") != -1) {
					pageType = "TeamViewer US Page";
				} else if (url.indexOf("teamviewer.us") != -1) {
					pageType = "TeamViewer Global Page";
				}
				break;
		}

		if (document.title != "") {
			title = pageType + " | " + document.title;
		} else {
			title = pageType + " | " + path;
		}
		return title;
	} catch (e) {}
}

titleGen();
