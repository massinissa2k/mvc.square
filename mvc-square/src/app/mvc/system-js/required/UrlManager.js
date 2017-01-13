var UrlManager = function() {

	class UrlManager{
		constructor(parent, route){
			this.route = route;
			this.routeLength = route.length;
			this.lastResStr = null;
			this.lastRes = null;
			this.lastInput = null;
			this.currentHash = null;
			this.lastHash = null;
			this.groupeOfRoute = null;
			this.groupeOfRouteL = 0;
			this.setCurrentHash();
		}

		setCurrentHash(){
			var currentHash = null;
			var lastHash = null;
			var groupeOfRoute = null;
			var groupeOfRouteL = null;

			currentHash = window.location.hash;

			if (currentHash !== null && currentHash === lastHash) {
				this.currentHash = currentHash;
				this.lastHash = lastHash;
				this.groupeOfRoute = groupeOfRoute;
				this.groupeOfRouteL = groupeOfRouteL;
				return;
			}

			groupeOfRoute = currentHash.substr(1).split("&");
			groupeOfRouteL = groupeOfRoute.length;

			this.groupeOfRoute = groupeOfRoute;
			this.groupeOfRouteL = groupeOfRouteL;
			this.currentHash = currentHash;
			lastHash = currentHash;
			return;
		}

		getNewParamsFromHash(getOrig){
			var res = null;
			var currRes = null;
			var currResStr = null;
			var resList = null;
			var origRes = null;

			this.setCurrentHash();
			this.lastRes = null;
			var i = 0;
			var L = this.routeLength;

			for (; i < L; i++) {
				res = this.checkOnGet(this.route[i]);

				if (res !== null) {
					origRes = res;
					this.lastInput = res.input;
					res = res.input.split("/");
					res = [res.shift(), res];

					resList = [this.route[i], res];
					currRes = res;
				}
			}

			if (getOrig === true) {
				return origRes;
			}

			this.lastRes = currRes;

			if (currRes !== null) {
				currResStr = currRes.toString();
			} else {
				currResStr = null;
			}

			if (this.lastResStr === currResStr) {
				return false;
			}

			this.lastResStr = currResStr;

			return resList;
		}

		getNewParamsFromLocal(from){
			var res = null;
			var currRes = null;
			var currResStr = null;
			var L = this.routeLength;
			var i = 0;
			var resList = null;
			var origRes = null;

			for (; i < L; i++) {
				res = this.checkOnGetLocal(this.route[i], from);

				if (res !== null) {
					origRes = res;

					res = res.input.split("/");
					res = [res.shift(), res];

					resList = [this.route[i], res];
					currRes = res;
				}
			}

			return origRes;
		}

		checkOnGet(routeArr){
			var J = null;
			var res = null;

			for (J in routeArr.onGet) {
				res = this.getUrlHash(routeArr.onGet[J]);

				if (res !== null) {
					return res;
				}
			}

			return null;
		}

		checkOnGetLocal(routeArr, from){
			var J = null;
			var res = null;
			for (J in routeArr.onGet) {
				res = this.getLocalHash(routeArr.onGet[J], from);

				if (res !== null) {
					return res;
				}
			}

			return null;
		}

		checkIt(name, from){
			return from.match(new RegExp(name));
		}

		getLocalHash(name, from){
			var results = null;
			var i = 0;
			var fromArr = from.split("&");
			var fromL = fromArr.length;

			for (; i < fromL; i++) {
				results = this.checkIt(name, fromArr[i]);

				if (results !== null) {
					return results;
				}
			}

			return results;
		}

		getUrlHash(name){
			var results = null;
			var i = 0;

			if (name === "") {
				var outNull = [""];
				outNull.index = 0;
				outNull.input = "";
				return outNull;
			}

			for (; i < this.groupeOfRouteL; i++) {
				results = this.checkIt(name, this.groupeOfRoute[i]);

				if (results !== null) {
					return results;
				}
			}

			return results;
		}

		switchUrl(path){
			var p = null;
			var resList = this.getNewParamsFromLocal(path);
			var resList2 = this.getNewParamsFromHash(true);

			if (resList !== null && resList2 !== null) {
				window.location.hash = window.location.hash.replace(resList2.input, path);
			} else if (resList !== null) {
				p = window.location.hash.split("&");

				if (p[0].trim() === "") {
					p.shift();
				}

				p.push(path);
				p = p.join("&");
				window.location.hash = p;
			} else if (path === "") {
				window.location.hash = window.location.hash.replace(new RegExp("(\#|\&)" + this.lastInput, "gi"), path);
			}

			return;
		}

		switchUrlAll(path){
			window.location.hash = path;
		}
	}

	return UrlManager;
}();
mvc.UrlManager = UrlManager;