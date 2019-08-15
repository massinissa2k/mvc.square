class RouteManager {
	constructor(parent, route, routeName) {
		this.parent = parent;
		this.route = route;
		this.routeLength = route.length;
		this.urlManager = new UrlManager(this, this.route);
		this.routeName = routeName;
		this.controllers = {};
		this.lastHash = null;
	}

	hashchange() {
		var J = null;
		var ressourcesStats = null;
		var resList = null;

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

	swapView(i, newDataController, res) {
		var ct = null;

		ct = this.parent.tmplEngine.getHtml(newDataController.template, {
			"__param__": res[1]
		}, mvc.controllers[newDataController.controller], null, true);

		if (this.controllers[i] !== null) {
			this.beforeSwapViewIn(i, ct);
			//ct.beforeSwapViewIn(this.controllers[i], this.onSwapView.bind(this, i, ct));
		}
	}

	swapViewOut(i) {
		var ct = this.parent.tmplEngine.getHtml(null, null, null, this.routeName, true);
		if (this.controllers[i] !== null) {
			this.beforeSwapViewIn(i, ct);
			//ct.beforeSwapViewIn(this.controllers[i], this.onSwapView.bind(this, i, ct));
		}
	}

	onSwapView(oldCtPosI, ct) {
		if (this.controllers[oldCtPosI].htmlElement.parentElement === null) {
			this.controllers[oldCtPosI] = null;
			delete this.controllers[oldCtPosI];
			return;
		}

		ct.events.addListener("onShow", this.onShow.bind(this, ct, oldCtPosI));
		return;
	}

	onShow(ct, oldCtPosI) {
		this.controllers[oldCtPosI].htmlElement.parentElement.replaceChild(ct.htmlElement, this.controllers[oldCtPosI].htmlElement);
		this.controllers[oldCtPosI] = null;
		delete this.controllers[oldCtPosI];
		this.controllers[ct.ctId] = ct;
	}

	beforeSwapViewIn(oldCtPosI, ct) {
		ct.beforeSwapViewIn(this.controllers[oldCtPosI], this.onSwapView.bind(this, oldCtPosI, ct));
	}

	cleanControllers() {
		var J = null;
		for (J in this.controllers) {
			if (this.controllers[J] === null) {
				delete this.controllers[J];
			}
		}
	}

	manage(controller, routeName) {
		this.controllers[controller.ctId] = controller;
	}
}