function licenseCheck() {
	try {
		var el = document.getElementById("my-content");
		var license = {
			type: el.dataset.licensetype,
			version: el.dataset.version
		};

		if (license.version === -1) {
			license = license.type + " license - subscription";
		} else {
			license = license.type + " license - v." + license.version;
		}
		return license;
	} catch (e) {}
}
