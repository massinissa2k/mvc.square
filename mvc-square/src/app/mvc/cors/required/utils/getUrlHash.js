(function(utils) {

	function getUrlHash(name) {
		let results = new RegExp('[\?#&]' + name + '=([^&#]*)').exec(window.location.hash);

		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	}
	
	Object.defineProperty(utils, "getUrlHash", {
		value: getUrlHash,
		writable: false,
		enumerable: false
	});

})(mvc.utils);