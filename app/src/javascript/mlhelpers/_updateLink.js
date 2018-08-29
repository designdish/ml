var updateLink = function(params, str, event) {
	var link = event.target;
	link = getClosest(link, "a");
	linkURL = link.href;

	var currentPage = window.location.href;
	var currentParams = window.location.search;
	if (linkURL.indexOf(str) != -1 && linkURL.indexOf("mailto") === -1) {
		link.href = checkParams(linkURL, params);

		// if (joinParams != undefined) {
		//     link.href = joinParameters(linkURL, joinParams[0], joinParams[1]);
		// }
	} else if (linkURL.indexOf(str) === -1) {
		window.location = link.href + currentParams;
	} 
	console.dir(link.href);
	window.location = link.href;

};
