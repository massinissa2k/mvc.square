var Controller = function() {
	class Controller{
		constructor(parent, tmplEngine, viewElem, controllers, routes, templateName){
			this.parent = parent;
			this.templateName = templateName;
			this.controllers = controllers;
			this.viewElem = viewElem;
			this.tmplEngine = tmplEngine;
			this.routes = routes;
			this.virtualUrl = this.parent.virtualUrl;

			if (this.parent instanceof(MainMvc) === false) {
				this.isMain = false;
				DEBUG_WARN("is not MainMvc");
			} else {
				this.mainMvc = this.parent;
			}
		}

		init() {
			var m = this.tmplEngine.getHtml(this.templateName, {}, this.controllers.MainView);
			this.viewElem.appendChild(m);
			this.virtualUrl.hashchange();
		}

		createController(controllerClass, routeName) {
			var ct = null;
			ct = new controllerClass(this, this.tmplEngine, routeName);
			ct.parent = this;
			ct.beforeInit();
			if (typeof(routeName) === "string") {
				this.virtualUrl.add(ct, routeName);
			}

			ct.superController = this;
			return ct;
		}
	}
	return Controller;
}();