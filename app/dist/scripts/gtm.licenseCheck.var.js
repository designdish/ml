"use strict";

function licenseCheck() {
	var el = document.getElementById("my-content");
	var license = {
		type: el.dataset.licensetype,
		version: el.dataset.version
	};
	return { license: license };
}
