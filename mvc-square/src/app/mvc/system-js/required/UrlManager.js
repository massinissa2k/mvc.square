var UrlManager = function() {
	var _construct = function(parent, route) {
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
	};

	var proto = _construct.prototype;

	proto.setCurrentHash = function() {
		var currentHash = null;
		var lastHash = null;
		var groupeOfRoute = null;
		var groupeOfRouteL = null;

		return function() {
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
	}();

	proto.getNewParamsFromHash = function() {
		var res = null;
		var currRes = null;
		var currResStr = null;
		var L = null;
		var i = null;
		var resList = null;
		var origRes = null;
		return function(getOrig) {
			this.setCurrentHash();
			currRes = null;
			this.lastRes = null;
			L = this.routeLength;
			i = 0;
			resList = null;
			origRes = null;

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
	}();

	proto.getNewParamsFromLocal = function() {
		var res = null;
		var currRes = null;
		var currResStr = null;
		var L = null;
		var i = null;
		var resList = null;
		var origRes = null;
		return function(from) {
			currRes = null;
			L = this.routeLength;
			i = 0;
			resList = null;
			origRes = null;

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
	}();

	proto.checkOnGet = function() {
		var J = null;
		var res = null;
		return function(routeArr) {
			for (J in routeArr.onGet) {
				res = this.getUrlHash(routeArr.onGet[J]);

				if (res !== null) {
					return res;
				}
			}

			return null;
		}
	}();

	proto.checkOnGetLocal = function() {
		var J = null;
		var res = null;
		return function(routeArr, from) {
			for (J in routeArr.onGet) {
				res = this.getLocalHash(routeArr.onGet[J], from);

				if (res !== null) {
					return res;
				}
			}

			return null;
		}
	}();

	proto.checkIt = function(name, from) {
		return from.match(new RegExp(name));
	};

	proto.getLocalHash = function() {
		var results = null;
		var i = 0;
		var fromL = null;
		var fromArr = null;

		return function(name, from) {
			results = null;
			i = 0;

			fromArr = from.split("&");
			fromL = fromArr.length;

			for (; i < fromL; i++) {
				results = this.checkIt(name, fromArr[i]);

				if (results !== null) {
					return results;
				}
			}

			return results;
		}
	}();

	proto.getUrlHash = function() {
		var results = null;
		var i = 0;
		var outNull = null;
		return function(name) {
			if (name === "") {
				outNull = [""];
				outNull.index = 0;
				outNull.input = "";
				return outNull;
			}

			results = null;
			i = 0;

			for (; i < this.groupeOfRouteL; i++) {
				results = this.checkIt(name, this.groupeOfRoute[i]);

				if (results !== null) {
					return results;
				}
			}

			return results;
		}
	}();

	proto.switchUrl = function() {
		var p = null;
		var resList = null;
		var resList2 = null;
		return function(path) {
			p = null;

			resList = this.getNewParamsFromLocal(path);
			resList2 = this.getNewParamsFromHash(true);

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
	}();

	proto.switchUrlAll = function(path) {
		window.location.hash = path;
	};

	return _construct;
}();
mvc.UrlManager = UrlManager;