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
		constructor(sharedContext) {
			this.sharedContext = sharedContext||{};
			this.sharedContext["__MVSbuffer__"] = "";
		}

		build(strIn) {
			strIn = strIn.replace(addSlashesReg, this.addSlashes);
			return "this.__MVSbuffer__ = \'" + strIn.replace(getScriptReg, this.switchToScript.bind(this)) + "\';return this.__MVSbuffer__;";
		}

		addSlashes(m) {
			let ind = escapableKeys.indexOf(m);
			if (ind !== -1) {
				return escapableValues[ind];
			}
			return "";
		}

		switchToScript(m, script) {
			return "\';" + (script.trim().replace(stripSlashesReg, "'")) + ";this.__MVSbuffer__ += \'";
		}

		bufferAdd(str){
			this.sharedContext["__MVSbuffer__"] += str;
		}

		compile(plainText) {
			return (data)=>{
				this.sharedContext["data"] = this.sharedContext["_$_"] = data;
				return new Function( this.build(plainText) ).bind(this.sharedContext)();
			};
		}
	}

	return Tjs;
}();