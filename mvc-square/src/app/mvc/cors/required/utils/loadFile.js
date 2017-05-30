(function(utils) {

	function dataUriParse(data, methode) {

		let returnEmpty = "";
		let str = "";
		let separator = "&";
		let dataArr = [];

		if (methode.toLowerCase() === "post") {
			returnEmpty = null;
		}

		if (data === null) {
			return returnEmpty;
		}

		for (let J in data) {
			dataArr.push([J, encodeURIComponent(data[J])].join("="));
		}

		str = dataArr.join(separator);

		if (str === "") {
			return returnEmpty;
		}

		return str;
	}

	function getXMLHttpRequest() {
		let _xhr = null;

		if (window.XMLHttpRequest || window.ActiveXObject) {
			if (window.ActiveXObject) {
				try {
					_xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					_xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
			} else {
				_xhr = new XMLHttpRequest();
			}
		}

		return _xhr;
	}

	function onreadystatechange(format, callBack) {
		if (this.readyState == 4) {
			let data = null;
			if (this.status == 200 || this.status == 304 || this.status == 0) {

				if (format === "xml") {
					data = this.responseXML;
				} else if (format === "json") {

					try {
						data = JSON.parse(this.responseText);
					} catch (e) {
						data = {};
					}

				} else {
					data = this.responseText;
				}
			}

			callBack(data, this);
		}
	}

	function xhr(methode, format, path, dataUri, callBack) {
		let xhr = getXMLHttpRequest();
		if (methode !== "POST") {
			methode = "GET";
		}

		if (methode === "GET") {
			xhr.open(methode, path + dataUriParse(dataUri, methode), true);
			xhr.send(null);
		} else {
			xhr.open(methode, path, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(dataUriParse(dataUri, methode));
		}

		xhr.onreadystatechange = onreadystatechange.bind(xhr, format, callBack);
		return null;

	}

	function loadFile(format, path, callBack) {
		xhr("GET", format, path, null, callBack);
	}

	Object.defineProperties(utils, {
		"loadFile": {
			value: loadFile,
			writable: false,
			enumerable: false
		}
	});

})(mvc.utils);