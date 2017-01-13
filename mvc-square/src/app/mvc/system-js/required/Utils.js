var Utils = function() {
	var _construct = function(parent) {

	};

	var proto = _construct.prototype;

	proto.uid = function() {
		var uid = 0;
		return function() {
			return uid++;
		}
	}();

	proto.uniqid = function() {
		return Date.now() + "_" + this.uid();
	};

	proto._ajax = function() {
		var _xhr = null;

		var getXMLHttpRequest = function() {

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
		};

		var J = null;
		var str = null;
		var andData = "";
		var dataUriParse = function(data, pref) {
			if (data === null) {
				if (pref === "") {
					return null;
				}
				return "";
			}

			str = "";
			andData = pref;
			for (J in data) {
				str += andData + J + "=" + encodeURIComponent(data[J]);
				andData = "&";
			}

			if (pref === "" && str === "") {
				return null;
			}

			return str;
		}
		var __json__ = null;
		var onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status == 200 || this.status == 304 || this.status == 0) {
					if (this.__DATA__format === "xml") {
						this.__DATA__callBack(this.responseXML, this.__DATA__path, this.__DATA__format, this.__DATA__returnArgs);
					} else if (this.__DATA__format === "json") {

						try {
							__json__ = JSON.parse(this.responseText);
						} catch (e) {
							__json__ = {};
						}

						this.__DATA__callBack(__json__, this.__DATA__path, this.__DATA__format, this.__DATA__returnArgs);
					} else {
						this.__DATA__callBack(this.responseText, this.__DATA__path, this.__DATA__format, this.__DATA__returnArgs);
					}
				} else {
					this.__DATA__callBack(false, this.__DATA__path, this.__DATA__format, this.__DATA__returnArgs);
				}
			}
		};

		return function(methode, format, path, xmlData, callBack, returnArgs) {
			var xhr = getXMLHttpRequest();

			xhr.__DATA__format = format;
			xhr.__DATA__path = path;
			xhr.__DATA__callBack = callBack;
			xhr.__DATA__returnArgs = returnArgs;

			if (format === "text") {
				//xhr.responseType = "text";
			}

			if (methode != "POST") {
				xhr.open(methode, path + dataUriParse(xmlData, "?"), true);
				xhr.send(null);
			} else {
				xhr.open(methode, path, true);
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xhr.send(dataUriParse(xmlData, ""));
			}

			xhr.onreadystatechange = onreadystatechange;
			return null;
		}
	}();

	proto.loadFile = function(format, path, callBack, callBackArgs) {
		_UTILS._ajax("GET", format, path, null, callBack, callBackArgs);
	};

	proto.classManager = function() {
		var tmpClassNames = null;
		var tmpClassNamesSp = null;
		var tmpClassNamesSpL = null;
		var trouveAny = false;
		var trouve = null;
		var indexOfPos = null;
		var currClassL = null;
		var stFirst = null;

		return function(elem, key, value) {
			trouve = null;
			if (value !== null) {
				value = value.toString();
			}

			//key = key.toLowerCase();
			trouveAny = false;

			if (typeof(jQuery) !== "undefined" && elem instanceof jQuery) {
				elem = elem[0];
			}

			tmpClassNames = elem.className;
			if (tmpClassNames) {
				trouveAny = true;
				tmpClassNamesSp = tmpClassNames.split(" ");
				tmpClassNamesSpL = tmpClassNamesSp.length;

				while (tmpClassNamesSpL--) {
					indexOfPos = tmpClassNamesSp[tmpClassNamesSpL].indexOf(key);
					if (indexOfPos != -1) {
						currClassL = tmpClassNamesSp[tmpClassNamesSpL].length;
						stFirst = tmpClassNamesSp[tmpClassNamesSpL].substring(key.length, currClassL);

						if (value !== null && stFirst.split("-").length !== value.split("-").length) {
							continue;
						}

						trouve = tmpClassNamesSp[tmpClassNamesSpL];
						break;
					}
				}
			}

			if (trouve) {
				tmpClassNames = tmpClassNames.replace(trouve, key + value);
			} else if (trouveAny) {
				tmpClassNames += " " + key + value;
			} else {
				tmpClassNames += key + value;
			}

			//elem.className = tmpClassNames.toLowerCase();
			elem.className = tmpClassNames;
			return false;
		};
	}();

	proto.preventDefault = function(event) {
		event.stopPropagation(event);
		event.preventDefault(event);
		event.cancelBubble = true;
		return false;
	};

	proto.getUrlQueryByName = function() {
		var urlParams = {};
		var match = null;
		var pl = /\+/g;
		var search = /([^&=]+)=?([^&]*)/g;
		var query = window.location.search.substring(1);

		var decode = function(s) {
			return decodeURIComponent(s.replace(pl, " "));
		};

		while (match = search.exec(query)) {
			urlParams[decode(match[1])] = decode(match[2]);
		}

		return function(name) {
			if (typeof(urlParams[name]) !== "undefined") {
				return urlParams[name]
			}
			return null;
		}
	}();

	proto.stringToHex = function() {
		var arr1 = null;
		var n = 0;
		var l = 0;
		var hex = 0;

		return function(str) {
			arr1 = [];
			n = 0;
			l = str.length;
			hex = 0;

			for (; n < l; n++) {
				hex = Number(str.charCodeAt(n)).toString(16);
				arr1.push(hex);
			}

			return arr1.join('');
		}
	}();

	proto.hexToString = function() {
		var arr1 = null;
		var str = '';
		var i = 0;
		var hL = 0;

		return function(hex) {
			hex = hex.toString();
			arr1 = [];
			str = '';
			i = 0;
			hL = hex.length;

			for (; i < hL; i += 2) {
				arr1.push(String.fromCharCode(parseInt(hex.substr(i, 2), 16)));
			}

			return arr1.join("");
		}
	}();

	proto.preventScrollBack = function() {
		var $this = null;
		var scrollTop = 0;
		var scrollHeight = 0;
		var height = 0;
		var delta = 0;
		var up = 0;

		var prevent = function(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			ev.returnValue = false;
			return false;
		};

		return function(htmlElement, off) {
			if (off === true) {
				$(htmlElement).off();
				return;
			}

			$(htmlElement).on('DOMMouseScroll mousewheel', function(ev) {
				$this = $(this);
				scrollTop = this.scrollTop;
				scrollHeight = this.scrollHeight;
				height = $this.height();

				delta = (ev.type == 'DOMMouseScroll' ? ev.originalEvent.detail * -60 : ev.originalEvent.wheelDelta);
				up = delta > 0;

				if (!up && -delta > scrollHeight - height - scrollTop) {
					// Scrolling down, but this will take us past the bottom.
					$this.scrollTop(scrollHeight);
					return prevent(ev);
				} else if (up && delta > scrollTop) {
					// Scrolling up, but this will take us past the top.
					$this.scrollTop(0);
					return prevent(ev);
				}
			});

			return;
		}
	}();

	proto.setHeightFromRation = function(elem, wr, hr) {
		elem.style.height = ((elem.clientWidth / wr) * hr) + "px";
	};

	proto.getUrlHash = function(name) {
		var results = new RegExp('[\?#&]' + name + '=([^&#]*)').exec(window.location.hash);

		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	};

	proto.getSupportedTransform = function() {
		var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
		var div = document.createElement('div');
		var prefResult = false;
		for (var i = 0; i < prefixes.length; i++) {
			if (div && div.style[prefixes[i]] !== undefined) {
				prefResult = prefixes[i];
				break;
			}
		}

		return function() {
			return prefResult;
		}
	}();

	proto.getSupportedTransformSvg = function() {
		var prefixes = 'transform';
		var _elemTest = null;
		var lastVal = false;
		return function(elemTest, isSvg) {
			if (isSvg !== true) {
				return false;
			}

			if (_elemTest !== null) {
				return lastVal;
			}

			_elemTest = elemTest;

			if (elemTest[prefixes] !== null && typeof(elemTest[prefixes]) === "object") {
				lastVal = true;
			}

			return lastVal;
		}
	}();

	return _construct;
}();