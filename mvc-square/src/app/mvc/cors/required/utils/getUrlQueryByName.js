(function(utils) {

	let urlParams = {};
	let pl = /\+/g;
	let search = /([^&=]+)=?([^&]*)/g;
	let query = window.location.search.substring(1);
	let match;
	
	function decode(s) {
		return decodeURIComponent(s.replace(pl, " "));
	}

	while (match = search.exec(query)) {
		urlParams[decode(match[1])] = decode(match[2]);
	}

	function getUrlQueryByName(name) {

		if (typeof(urlParams[name]) !== "undefined") {
			return urlParams[name]
		}
		return null;
	}

	Object.defineProperties(utils, {
		"getUrlQueryByName": {
			value: getUrlQueryByName,
			writable: false,
			enumerable: false
		}
	});

})(mvc.utils);