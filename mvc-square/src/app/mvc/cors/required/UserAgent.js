var UserAgent = function() {
	var OS = {};
	OS.IOS = 'iOS';
	OS.ANDROID = 'android';
	OS.BLACKBERRY = 'blackberry';
	OS.WINDOWS = 'windows';
	OS.MACINTOSH = 'macintosh';
	OS.FIREFOX = 'firefox';
	OS.TIZEN = 'tizen';

	var BROWSER = {};
	BROWSER.TRIDENT = 'trident';
	BROWSER.EDGE = 'edge';
	BROWSER.MSIE_PLUS = 'msie';
	BROWSER.MSIE9 = 'msie9';
	BROWSER.MSIE8 = 'msie8';
	BROWSER.SAFARI = 'safari';
	BROWSER.CHROME = 'chrome';
	BROWSER.FIREFOX = 'firefox';
	BROWSER.ANDROID = 'android';
	BROWSER.TIZEN = 'tizen';
	BROWSER.BLACKBERRY = 'blackberry';

	var FORMAT = {};
	FORMAT.TABLET = 'tab';
	FORMAT.PHONE = 'phone';
	FORMAT.PC = 'pc';

	var UNKNOWN = 'unknown';
	var toFindArray = "android,blackberry,chrome,firefox,ipad,iphone,mobile,tablet,tizen,windows,msie 9,trident,edge,msie 8,msie,macintosh".split(',');
	var toFindPos = {};
	var userAgent = navigator.userAgent.toLowerCase();
	var J = null;
	for (J in toFindArray) {
		toFindPos[toFindArray[J]] = (userAgent.indexOf(toFindArray[J]) !== -1);
	}

	var userAgent = {
		"os": {
			"name": UNKNOWN,
			"version": UNKNOWN
		},
		"device": {
			"type": UNKNOWN
		},
		"browser": {
			"name": UNKNOWN
		}
	};

	class UserAgent{
		constructor(){
			this.userAgent = userAgent;
			this.constructObject();
			mvc.config.device.type = this.userAgent.device.type;
			mvc.config.device.os = this.userAgent.os.name;
			mvc.config.device.getCurrentOs = "&os=" + this.userAgent.os.name;
		}

		iOSVersion(){
			return (/CPU.*OS ([0-9]{1,5})/i.exec(navigator.userAgent) || ['', UNKNOWN])[1];
		}

		androidVersion(){
			return (/Android ([0-9]+\.[0-9]+)/i.exec(navigator.userAgent) || ['', UNKNOWN])[1];
		}

		constructObject(){
			if (toFindPos.iphone || toFindPos.ipad) {
				this.userAgent.os.name = OS.IOS;
				this.userAgent.device.type = FORMAT.TABLET;
				this.userAgent.browser.name = BROWSER.SAFARI;

				if (toFindPos.iphone) {
					this.userAgent.device.type = FORMAT.PHONE;
				}
			} else if (toFindPos.android) {
				this.userAgent.os.name = OS.ANDROID;
				this.userAgent.browser.name = BROWSER.ANDROID;
				this.userAgent.device.type = FORMAT.TABLET;

				if (toFindPos.chrome) {
					this.userAgent.browser.name = BROWSER.CHROME;
				} else if (toFindPos.firefox) {
					this.userAgent.browser.name = BROWSER.FIREFOX;
				}
			} else if (toFindPos.firefox && !toFindPos.android && (toFindPos.mobile || toFindPos.tablet)) {
				this.userAgent.os.name = OS.FIREFOX;
				this.userAgent.browser.name = BROWSER.FIREFOX;
				this.userAgent.device.type = FORMAT.TABLET;
			} else if (toFindPos.tizen) {
				this.userAgent.os.name = OS.TIZEN;
				this.userAgent.browser.name = BROWSER.TIZEN;
				this.userAgent.device.type = FORMAT.TABLET;
			} else if (toFindPos.blackberry) {
				this.userAgent.os.name = OS.BLACKBERRY;
				this.userAgent.browser.name = BROWSER.BLACKBERRY;
				this.userAgent.device.type = FORMAT.TABLET;
			} else if (toFindPos.windows && (toFindPos["msie 9"] || toFindPos["trident"])) {
				this.userAgent.os.name = OS.WINDOWS;
				this.userAgent.browser.name = BROWSER.MSIE9;
				this.userAgent.device.type = FORMAT.PC;
			} else if (toFindPos.windows && toFindPos["msie 8"]) {
				this.userAgent.os.name = OS.WINDOWS;
				this.userAgent.browser.name = BROWSER.MSIE8;
				this.userAgent.device.type = FORMAT.PC;
			} else if (toFindPos.macintosh) {
				this.userAgent.os.name = OS.MACINTOSH;
				this.userAgent.browser.name = UNKNOWN;
				this.userAgent.device.type = FORMAT.PC;
			}

			if (this.userAgent.os.name !== OS.IOS && toFindPos.mobile) {
				this.userAgent.device.type = FORMAT.PHONE;
			}

			if (this[this.userAgent.os.name + "Version"]) {
				this.userAgent.os.version = this[this.userAgent.os.name + "Version"]();
			}

			this.addTagToHtml();
		}

		getRefClass(obj, classListe, str){
			for (var J in obj) {
				if (typeof(obj[J]) === "object") {
					this.getRefClass(obj[J], classListe, str + J + "-");
				} else {
					classListe.push(str + J + "-" + obj[J]);
				}
			}
		}

		addTagToHtml(){
			var classListe = [];
			this.getRefClass(this.userAgent, classListe, "user-agent-");

			var html = document.body;
			var i = 0;
			var L = classListe.length;

			for (; i < L; i++) {
				mvc.utils.classManager(html, classListe[i], "");
			}
		}
	}

	return UserAgent;
}();