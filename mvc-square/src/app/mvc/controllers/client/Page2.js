(() => {

	class Page2 extends mvc.controllers.Default {

		constructor( parent , tmplEngine ){
			super();
			this.parent = parent;
			this.tmplEngine = tmplEngine;
			//var article = mvc.models.load("Article");
			//article.reload();
		}

		onCreate(domPositionElem, data, next) {}

		onShow(tmpl, htmlElement, data, next) {
			//setTimeout(function(){
				next();
			//},16);
			return false;
        }

        onSwapViewIn(){
        }
	}

	mvc.addController("Page2", Page2);
})();