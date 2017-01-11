var Language = function() {

	class Language{
		constructor(parent){
			this.parent = parent;
			this.userConfig = parent.userConfig;
			this.configLng = this.userConfig.languages;
			this.defaultLng = this.configLng.default;
			this.currentLng = this.defaultLng;
			this.availableLng = this.configLng.available;

			this.onLngReadyObj = new CustomEvent(_CONST.LNG.ready);

			this.switchLng();
			this.loadFile();
		}

		switchLng(){
			this.setFromQueryUrl();
			if (this.isAvailableLng() === false) {
				this.currentLng = this.defaultLng;
			}
		}

		setFromQueryUrl(){
			this.currentLng = _UTILS.getUrlQueryByName(_CONST.LNG.urlKey) || this.defaultLng;
		}

		isAvailableLng() {
			if (typeof(this.availableLng[this.currentLng]) === "undefined" || this.availableLng[this.currentLng] === false) {
				return false;
			}

			return true;
		}

		loadFile(){
			_UTILS.loadFile("json", this.configLng.dirPath + "/" + this.currentLng + this.configLng.format, this.lngReady.bind(this));
		}

		lngReady(data){
			this.data = data;
			this.onLngReadyObj.data = {
				"lng": this.getLngByName.bind(this)
			};
			window.dispatchEvent(this.onLngReadyObj);
		}

		getLngByName(name) {
			if (this.data[name] !== "undefined") {
				return this.data[name];
			}
			return name;
		}
	}
	
	return Language;
}();