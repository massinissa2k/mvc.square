var RouteManager = function() {
	var _construct = function(parent, route, routeName) {
		this.parent = parent;
		this.route = route;
		this.routeLength = route.length;
		this.urlManager = new UrlManager(this, this.route);
		this.routeName = routeName;
		this.controllers = {};
		this.lastHash = null;
	};

	var proto = _construct.prototype;

	proto.hashchange = function() {
		var J = null;
		var ressourcesStats = null;
		var resList = null;

		return function() {
			ressourcesStats = null;

			resList = this.urlManager.getNewParamsFromHash();

			if (resList === false) {
				return;
			}

			if (resList !== null) {
				ressourcesStats = true;

				for (J in this.controllers) {
					this.swapView(J, resList[0], resList[1]);
				}
			}

			if (ressourcesStats === null) {
				for (J in this.controllers) {
					this.swapViewOut(J);
				}
			}

			this.cleanControllers();

		}
	}();

	proto.swapView = function() {
		var ct = null;
		return function(i, newDataController, res) {
			ct = this.parent.tmplEngine.getHtml(newDataController.template, {
				"__param__": res[1]
			}, mvc.controllers[newDataController.controller], null, true);
			if (this.controllers[i] !== null) {
				ct.beforeSwapViewIn(this.controllers[i], this.onSwapView.bind(this, i, ct));
			}
		}
	}();

	proto.swapViewOut = function() {
		var ct = null;
		return function(i) {
			ct = this.parent.tmplEngine.getHtml(null, null, null, this.routeName, true);
			if (this.controllers[i] !== null) {
				ct.beforeSwapViewIn(this.controllers[i], this.onSwapView.bind(this, i, ct));
			}
		}
	}();

	proto.onSwapView = function(oldCtPosI, ct) {
		if (this.controllers[oldCtPosI].htmlElement.parentElement === null) {
			this.controllers[oldCtPosI] = null;
			delete this.controllers[oldCtPosI];
			return;
		}

		this.controllers[oldCtPosI].htmlElement.parentElement.replaceChild(ct.htmlElement, this.controllers[oldCtPosI].htmlElement);
		this.controllers[oldCtPosI] = null;
		delete this.controllers[oldCtPosI];
		this.controllers[ct.ctId] = ct;

		return;
	};

	proto.cleanControllers = function() {
		var J = null;
		return function() {

			for (J in this.controllers) {
				if (this.controllers[J] === null) {
					delete(this.controllers[J]);
				}
			}

			J = null;
		}
	}();

	proto.manage = function(controller, routeName) {
		this.controllers[controller.ctId] = controller;
	};

	return _construct;
}();