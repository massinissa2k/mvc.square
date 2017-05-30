(function(utils) {

	var _uid = 0;

	function uid() {
		return _uid++;
	}

	function uniqid() {
		return Date.now() + "_" + uid();
	}

	Object.defineProperties(utils, {
		"uid": {
			value: uid,
			writable: false,
			enumerable: false
		},
		"uniqid": {
			value: uniqid,
			writable: false,
			enumerable: false
		}
	});

})(mvc.utils);