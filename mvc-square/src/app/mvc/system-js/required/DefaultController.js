controllers.DefaultController = controllers.Default = function() {

	class DefaultController{
		constructor(parent){
			this.parent = parent;
			this.ctId = null;
			this.templateElement = null;
			this.htmlElement = null;
		}

		__init__(templateElement, data, next){
			this.beforeCreate(templateElement, data, next);
		}

		beforeInit(){
			this.ctId = this.ctId || _UTILS.uniqid();
		}

		beforeCreate(templateElement, data, next){
			this.templateElement = templateElement;
			if (this.onCreate(templateElement, data, next) !== false) {
				next();
				return;
			}
			return;
		}

		beforeShow(templateElement, htmlElement, data, next) {
			this.htmlElement = htmlElement;
			this.templateElement = templateElement;

			if (this.onShow(templateElement, htmlElement, data, next) !== false) {
				next();
				return;
			}
			return;
		}

		beforeSwapViewIn(oldController, next) {
			if (this.onSwapViewIn(oldController, oldController.beforeSwapViewOut.bind(oldController, this, next)) !== false) {
				oldController.beforeSwapViewOut(this, next);
				return;
			}
			return;
		}

		beforeSwapViewOut(newController, next) {
			if (this.onSwapViewOut(newController, next) !== false) {
				next();
				return;
			}
			return;
		}

		onCreate(domPositionElem, data, next) {
			return true;
		}

		onShow(tmpl, htmlElement, data, next) {
			//console.log(this.htmlElement);
			return true;
		}

		onSwapViewIn(oldController, next) {
			return true;
		}

		onSwapViewOut(newController, next) {
			return true;
		}
	}
	return DefaultController;
}();