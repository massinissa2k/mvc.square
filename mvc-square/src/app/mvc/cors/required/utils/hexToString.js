(function(utils) {

	function stringToHex(str) {
		let arr1 = [];
		let n = 0;
		let l = str.length;
		let hex = 0;

		for (; n < l; n++) {
			hex = Number(str.charCodeAt(n)).toString(16);
			arr1.push(hex);
		}

		return arr1.join('');
	}

	function hexToString(hex) {
		hex = hex.toString();
		let arr1 = [];
		let str = '';
		let i = 0;
		let hL = hex.length;
		for (; i < hL; i += 2) {
			arr1.push(String.fromCharCode(parseInt(hex.substr(i, 2), 16)));
		}

		return arr1.join("");
	}

	Object.defineProperties(utils, {
		"stringToHex": {
			value: stringToHex,
			writable: false,
			enumerable: false
		},
		"hexToString": {
			value: hexToString,
			writable: false,
			enumerable: false
		}
	});

})(mvc.utils);