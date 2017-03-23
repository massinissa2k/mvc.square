controllers.Page = function() {
	class Page extends controllers.Default {

		constructor( parent , tmplEngine ){
			super();
			this.parent = parent;
			this.tmplEngine = tmplEngine;
			//var article = mvc.models.load("Article");
			//article.reload();
		}

		onCreate(domPositionElem, data, next) {
			setTimeout(function(){
				next();
			},16);
			return false;
		}

		onShow(tmpl, htmlElement, data, next) {
			setTimeout(function(){
				next();
			},16);
			return false;
        }

        onSwapViewIn(){
        }
	}
	return Page;
}();