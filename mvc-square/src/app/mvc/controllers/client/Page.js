controllers.Page = function() {
	class Page extends controllers.Default {

		constructor(){
			super();
			//var article = mvc.models.load("Article");
			//article.reload();
		}

		onCreate(domPositionElem, data, next) {
		}

		onShow(tmpl, htmlElement, data, next) {
        }
	}
	return Page;
}();