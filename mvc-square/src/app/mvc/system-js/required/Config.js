var Config = function(){
	
	function templateList() {
		return TEMPLATES_DATA;
	}

	class Config{
		constructor(){
			this.template = {};
			this.device = {
				getCurrentOs: "&os=android",
				type: "other",
				os: "other"
			};
		}

		setTemplates() {
			var t = templateList();
			for (var J in t["all-devices"]) {
				if (t[this.device.type] && t[this.device.type][J]) {
					this.template[J] = t[this.device.type][J];
				} else {
					this.template[J] = t["all-devices"][J];
				}
			}
		};

		getTemplates() {
			return this.template;
		};
	}
	return Config;
}()

