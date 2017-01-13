var TmplBuilder = function(){

	var scr = "";
	var plainText = "";
	var reg3 = new RegExp("\\\\'", "gi");
	var reg2 = new RegExp("(\\\r)|(\\\n)|(\\\\)|(\\\')", "gi");
	var reg = new RegExp("<%([^<][^%]*)%>", "gi");

	var replace1 = function(m) {
		switch (m) {
			case "\n":
				return "";
				break;

			case "\\":
				return "\\\\";
				break;

			case "\'":
				return "\\'";
				break;

			default:
				return "";
				break;
		}

		return "";
	};

	var replace0 = function(m, script) {
		scr = "\';" + (script.trim().replace(reg3, "'")) + ";";
		return scr + "this.buffer += \'";
	};

	class TmplBuilder{
		constructor(parent, id, str, rebuild, htmlreplaceable){
			scr = "";
			str = str.replace(reg2, replace1);
			plainText = "this.buffer = \'";

			plainText += str.replace(reg, replace0);

			plainText += "\';return this.buffer;";
			parent.saveById[id] = new TmplContext(parent, plainText, htmlreplaceable);

			scr = "";
			str = "";
			plainText = "";
		}

	}

	return TmplBuilder;
}();