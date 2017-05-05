var VirtualUrl = function() {

	class VirtualUrl{
		constructor(parent, routes, tmplEngine){
			this.parent = parent;
			this.routes = routes;
			this.tmplEngine = tmplEngine;

			this.routesManagers = {};

			this.setRouteManager(this.routes);
			window.addEventListener("hashchange", this.hashchange.bind(this), true);
		}

		hashchange(e){
			for (var J in this.routes) {
				this.routesManagers[J].hashchange();
			}
		}

		setRouteManager(routes){
			for (var J in routes) {
				this.routesManagers[J] = new RouteManager(this, routes[J], J);
			}
		}

		add(controller, routeName){
			if ((routeName in this.routesManagers) === false) {
				console.warn(routeName + " route name does not exist !");
				return false;
			}

			this.routesManagers[routeName].manage(controller, routeName);
		}

		switchUrl(path, routeName){
			if ((routeName in this.routesManagers) === true) {
				this.routesManagers[routeName].urlManager.switchUrl(path);
				return false;
			}

			UrlManager.prototype.switchUrlAll(path);

			return false;
		}
	}

	return VirtualUrl;
}();