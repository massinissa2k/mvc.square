mvc.controllers.DefaultController = mvc.controllers.Default = function () {

	function setEventsObject(ctx) {
		ctx.evtOnCreate = {
			type: "onCreate",
			target: null,
			context: ctx
		};

		ctx.evtOnShow = {
			type: "onShow",
			target: null,
			context: ctx
		};

		ctx.evtOnSwapViewIn = {
			type: "onSwapViewIn",
			target: null,
			context: ctx
		};

		ctx.evtOnSwapViewOut = {
			type: "onSwapViewOut",
			target: null,
			context: ctx
		};
	}

	function fireEvent(ctx, evtObject, next) {
		next();
		ctx.events.fire(evtObject);
		ctx.events.removeListener(evtObject.type, null);
	}

	function fireSwapViewOut(ctx, next) {
		ctx.events.fire(ctx.evtOnSwapViewOut);
		next();
		ctx.events.removeListener(ctx.evtOnSwapViewOut.type, null);
	}

	class DefaultController {
		constructor(parent) {
			this.parent = parent;
			this.ctId = null;
			this.templateElement = null;
			//this.htmlElement = document.createElement("div");
			this.htmlElement = null;

			this.evtBeforeCreate = null;
			setEventsObject(this);
			this.events = new EventManager();
		}

		__init__(templateElement, data, next) {
			this.beforeCreate(templateElement, data, next);
		}

		beforeInit() {
			this.ctId = this.ctId || mvc.utils.uniqid();
		}

		beforeCreate(templateElement, data, next) {
			this.templateElement = templateElement;

			if (this.onCreate(templateElement, data, fireEvent.bind(null, this, this.evtOnCreate, next)) !== false) {
				fireEvent(this, this.evtOnCreate, next);
				return;
			}
			return;
		}

		beforeShow(templateElement, htmlElement, data, next) {
			this.htmlElement = htmlElement;
			this.templateElement = templateElement;
			setTimeout(() => {
				let isAuto = this.onShow(templateElement, htmlElement, data, fireEvent.bind(null, this, this.evtOnShow, next)) !== false;
				if (isAuto) {
					fireEvent(this, this.evtOnShow, next);
					return;
				}
			}, 0);
			return;
		}

		beforeSwapViewIn(oldController, next) {

			if (this.onSwapViewIn(oldController, fireEvent.bind(null, this, this.evtOnSwapViewIn, oldController.beforeSwapViewOut.bind(oldController, this, next))) !== false) {
				fireEvent(this, this.evtOnSwapViewIn, oldController.beforeSwapViewOut.bind(oldController, this, next));
				return;
			}
			return;
		}

		beforeSwapViewOut(newController, next) {
			if (this.onSwapViewOut(newController, fireSwapViewOut.bind(null, this, next)) !== false) {
				fireSwapViewOut(this, next);
				return;
			}
			return;
		}

		onCreate(domPositionElem, data, next) {
			return true;
		}

		onShow(tmpl, htmlElement, data, next) {
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