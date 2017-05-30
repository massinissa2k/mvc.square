(function(utils) {

	var tmpClassNames = null;
	var tmpClassNamesSp = null;
	var tmpClassNamesSpL = null;
	var trouveAny = false;
	var found = null;
	var indexOfPos = null;
	var currClassL = null;
	var stFirst = null;

	function classManager(elem, key, value) {

		found = null;
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

					found = tmpClassNamesSp[tmpClassNamesSpL];
					break;
				}
			}
		}

		if (found) {
			tmpClassNames = tmpClassNames.replace(found, key + value);
		} else if (trouveAny) {
			tmpClassNames += " " + key + value;
		} else {
			tmpClassNames += key + value;
		}

		elem.className = tmpClassNames;
		return false;
	}

	Object.defineProperties(utils, {
		"classManager": {
			value: classManager,
			writable: false,
			enumerable: false
		}
	});

})(mvc.utils);