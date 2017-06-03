var Language = function() {

	class Language{
		constructor(parent){
			this.parent = parent;
			this.userConfig = parent.userConfig;
			this.configLng = this.userConfig.languages;
			this.defaultLng = this.configLng.default;
			this.currentLng = this.defaultLng;
			this.availableLng = this.configLng.available;
			this.switchLng();
		}

		init(){
			return new Promise((resolve, reject)=>{
				this.loadFile(resolve, reject);
			});
		}

		switchLng(){
			this.setFromQueryUrl();
			if (this.isAvailableLng() === false) {
				this.currentLng = this.defaultLng;
			}
		}

		setFromQueryUrl(){
			this.currentLng = mvc.utils.getUrlQueryByName(_CONST.LNG.urlKey) || this.defaultLng;
		}

		isAvailableLng() {
			if (typeof(this.availableLng[this.currentLng]) === "undefined" || this.availableLng[this.currentLng] === false) {
				return false;
			}

			return true;
		}

		loadFile(resolve, reject){
			mvc.utils.loadFile("json", this.configLng.dirPath + "/" + this.currentLng + this.configLng.format, this.lngReady.bind(this, resolve, reject));
		}

		lngReady(resolve, reject, data){
			if(!data){
				reject();
				return;
			}
			this.data = data;
			resolve();
		}

		getLngByName(name) {
			if (this.data[name] !== undefined) {
				return this.data[name];
			}
			return name;
		}
	}
	
	return Language;
}();