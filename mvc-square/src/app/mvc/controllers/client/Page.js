(() => {

	class Page extends mvc.controllers.Default {

		constructor(parent, tmplEngine) {
			super();
			this.parent = parent;
			this.tmplEngine = tmplEngine;
			//var article = mvc.models.load("Article");
			//article.reload();
		}

		onCreate(domPositionElem, data, next) {
		}

		onShow(tmpl, htmlElement, data, next) {
			//setTimeout(next);
			//return false;
		}

		onSwapViewIn() {
		}
	}

	mvc.addController("Page", Page);
})();