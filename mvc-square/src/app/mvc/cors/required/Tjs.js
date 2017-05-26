/*
 * convert hybrid HTML template to js template function 
 */
let Tjs = function() {
	let escapableKeys = ["\n", "\\", "\'"];
	let escapableValues = ["", "\\\\", "\\'"];
	let stripSlashesReg = new RegExp("\\\\'", "gi");
	let addSlashesReg = new RegExp("(\\\r)|(\\\n)|(\\\\)|(\\\')", "gi");
	let getScriptReg = new RegExp("<%([^<][^%]*)%>", "gi");

	class Tjs {
		constructor() {
			this.strOut = null;
			this.buffer = "";
		}

		build(strIn) {
			strIn = strIn.replace(addSlashesReg, this.addSlashes);
			this.strOut = "this.buffer = \'" + strIn.replace(getScriptReg, this.switchToScript.bind(this)) + "\';return this.buffer;";
			return this.strOut;
		}

		addSlashes(m) {
			let ind = escapableKeys.indexOf(m);
			if (ind !== -1) {
				return escapableValues[ind];
			}
			return "";
		}

		switchToScript(m, script) {
			return "\';" + (script.trim().replace(stripSlashesReg, "'")) + ";this.buffer += \'";
		}

		compile(strAction, data) {
			//return new Function(this.strOut || this.build(strAction)).bind(this);
		}
	}

	return Tjs;
}();