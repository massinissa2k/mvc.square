var Tmpl = function() {
	var _open = "<%";
	var _close = "%>";
	var htmlIds = 0;
	var htmlreplaceable = null;

	var hiddenHtml = "<tpl_replace></tpl_replace>";
	var echoHidden = "<echo_replace></echo_replace>";

	var _construct = function(parent, templatesList, tmplHelpers, next) {
		this.parent = parent;
		this.main = this.parent;
		this.tmplHelpers = tmplHelpers;
		this.mvcController = null;
		this.buffer = "";
		this.templatesList = templatesList;
		this.templatesReady = {};
		this.onLoadFile = this.onLoadFile_.bind(this);
		this.saveById = {};
		this.next = next;
		//this._echo_ 			= this._echoBind.bind( this );
		this.htmlElementExistLength = 0;
		this.htmlElementExtractedLength = 0;
		this.htmlElementList = {};
		htmlreplaceable = htmlreplaceable || "html" + _UTILS.uniqid();

		this.buildAll();
	};

	var proto = _construct.prototype;

	var createCommentElement = function() {
		var c = document.createComment("_");
		if (typeof(c.parentElement) !== "undefined" && c.parentElement === null) {
			hiddenHtml = echoHidden = "<!--_-->";
		}
	}();

	proto.setMvcController = function(mvcController) {
		this.mvcController = mvcController;
	};

	proto.onLoadFile_ = function(tpl, path, format, args) {

		if (tpl === false) {
			args.reject('Load Fail! ' + path);
			return;
		}

		this.templatesReady[args.id] = {
			id: args.id,
			url: args.url,
			tpl: tpl
		};

		args.resolve(args.id);
		return;
	};

	proto.onPromise = function(id, url, resolve, reject) {
		_UTILS.loadFile("text", url, this.onLoadFile, {
			id: id,
			url: url,
			resolve: resolve,
			reject: reject
		});
	};

	proto.buildOutPromise = function() {
		for (var J in this.templatesReady) {
			this.build(this.templatesReady[J].id, this.templatesReady[J].tpl);
		}

		this.next(true);
	};

	proto.onPromiseThen = function() {
		setTimeout(this.buildOutPromise.bind(this), 0);
	};

	proto.onPromiseError = function(error) {
		DEBUG_WARN(error);
		this.next(false);
	};

	proto.promiseGet = function(id, url) {
		return new Promise(this.onPromise.bind(this, id, url));
	};

	proto.buildAll = function() {
		var _self = this;
		var ps = [];

		for (var J in this.templatesList) {
			ps.push(this.promiseGet(J, this.templatesList[J]));
		}

		Promise.all(ps).then(this.onPromiseThen.bind(this)).catch(this.onPromiseError.bind(this));
	};

	proto._echo_ = function(str) {
		this.buffer += str + ";";
	};

	proto.pushHtmlElement = function(elem) {
		this.htmlElementList["htmlreplace_" + (htmlIds)] = elem;
		this.htmlElementExistLength++;
		htmlIds++;
	};

	proto.extractHtmlElement = function() {
		var elem = null;
		return function(id) {
			elem = this.htmlElementList[id];
			this.htmlElementList[id] = null;
			return elem;
		}
	}();

	proto.TemplateContext = function() {
		var _construct = function(parent, plainText) {
			this.parent = parent;
			this.buffer = "";
			this.get = this.parent.get.bind(parent);
			this.getHtml = this.parent.getHtml.bind(parent);

			this.templates = this.parent.templatesList;
			this.config = mvc.config;
			this.utils = mvc.utils;
			this.controllers = mvc.controllers;
			this.routes = mvc.routes;
			this.userAgent = mvc.userAgent;
			this.helpers = parent.tmplHelpers;

			this[_CONST.LNG.tmplKey] = mvc.lng;

			return new Function("mvc", "_$_", plainText).bind(this, mvc);
		};

		var proto = _construct.prototype;

		proto.goto = function(path, routeGroupe) {
			return (getWinMvc() + ".mainMvc.virtualUrl.switchUrl(\'" + path + "\',\'" + (routeGroupe || "") + "\')");
		};

		proto.echo = function(data) {
			if (data instanceof HTMLElement || data instanceof Comment || data instanceof SVGElement) {
				this.parent.pushHtmlElement(data);
				this.buffer += "<tpl id='htmlreplace_" + (htmlIds - 1) + "' class='" + htmlreplaceable + "'></tpl>";
				return;
			}

			this.buffer += data;
			return;
		};

		proto.onclick = function(action) {
			return "onclick=\"return false, " + action + "\"";
		};

		return _construct;
	}();

	proto.build = function() {
		var scr = "";
		var plainText = "";
		//var _ctx 		= {};

		var reg3 = new RegExp("\\\\'", "gi");
		var reg2 = new RegExp("(\\\r)|(\\\n)|(\\\\)|(\\\')", "gi");
		var reg = new RegExp("<%([^<][^%]*)%>", "gi");

		var replace1 = function(m) {
			switch (m) {
				case "\n":
					return "";
					break;

				case "\\":
					return "\\\\";
					break;

				case "\'":
					return "\\'";
					break;

				default:
					return "";
					break;
			}

			return "";
		};

		var replace0 = function(m, script) {
			scr = "\';" + (script.trim().replace(reg3, "'")) + ";";
			return scr + "this.buffer += \'";
		};

		return function(id, str, rebuild) {
			if (id === null && typeof(id) !== "undefined") {
				DEBUG_WARN("Request template id");
				return false;
			}

			if (rebuild !== true && typeof(this.saveById[id]) === "function") {
				return true;
			}

			scr = "";

			str = str.replace(reg2, replace1);
			plainText = "this.buffer = \'";

			plainText += str.replace(reg, replace0);

			plainText += "\';return this.buffer;";
			this.saveById[id] = new this.TemplateContext(this, plainText);

			scr = "";
			str = "";
			plainText = "";
			return true;
		}
	}();

	proto.buildGet = function(id, str, data) {
		this.build(id, str);
		return this.get(id, data);
	};

	proto.execScript = function(id, data) {
		if (typeof(this.saveById[id]) === "function") {
			return this.saveById[id](data);
		}

		DEBUG_WARN("unbuilded template " + id);
		return false;

	};

	proto.get = function(id, data, concatBuffer) {
		if (id === null && typeof(id) !== "undefined") {
			DEBUG_WARN("Request template id");
			return false;
		}

		return this.execScript(id, data);
	};

	proto.getFragment = function() {
		var fragment = document.createElement("div");
		return function(id, data) {
			fragment.innerHTML = this.get(id, data);
			return fragment.children[0];
		}
	}();

	proto.getHtmlFromFragment = function() {
		var htmlreplaceableElems = null;
		var i = 0;
		var L = 0;
		return function(htmlElement) {
			i = 0;

			if (this.htmlElementExistLength > this.htmlElementExtractedLength) {
				htmlreplaceableElems = htmlElement.querySelectorAll("tpl." + htmlreplaceable);

				L = htmlreplaceableElems.length

				this.htmlElementExistLength -= L;

				for (; i < L; i++) {
					htmlreplaceableElems[i].parentElement.replaceChild(this.extractHtmlElement(htmlreplaceableElems[i].id), htmlreplaceableElems[i])
				}
			}

			return htmlElement;
		}
	}();

	//befor onApplyHtmlData ??
	proto.applyHtmlData = function() {
		var htmlreplaceableElems = null;
		var i = 0;
		var L = 0;
		return function(htmlElement) {
			i = 0;
			L = 0;

			if (this.htmlElementExistLength > this.htmlElementExtractedLength) {
				htmlreplaceableElems = htmlElement.querySelectorAll("tpl." + htmlreplaceable);

				L = htmlreplaceableElems.length

				this.htmlElementExistLength -= L;

				for (; i < L; i++) {
					htmlreplaceableElems[i].parentElement.replaceChild(this.extractHtmlElement(htmlreplaceableElems[i].id), htmlreplaceableElems[i]);
				}
			}

			return htmlElement;
		}
	}();

	proto.showViewHtml = function(echoElement, htmlElement) {
		if (echoElement.parentElement !== null) {
			echoElement.parentElement.replaceChild(htmlElement, echoElement);
		}
	};

	proto.getHiddenHtml = function(id, routeName) {
		//return "<span tmplid='"+id+"' style='display:none!important' ></span>";
		return hiddenHtml;
	};

	proto.getEchoHidden = function(id, routeName) {
		//return "<span tmplid='"+id+"' style='display:none!important' ></span>";
		//return "<!---->";
		return hiddenHtml;
	};

	proto.getHtmlNext = function() {
		//var fragment = null;
		var htmlElement = null;

		return function(id, data, echoElement, ct, routeName) {
			var fragment = document.createElement("div");
			htmlElement = null;

			if (id === null) {
				fragment.innerHTML = this.getHiddenHtml(id, routeName);
				htmlElement = fragment.childNodes[0];
			} else {
				fragment.innerHTML = this.get(id, data);
				htmlElement = fragment.children[0];
				this.applyHtmlData(htmlElement);
			}

			//this.mvcController.onShow( ct , echoElement , htmlElement , data , this.showViewHtml.bind( this , echoElement , htmlElement ) );
			ct.beforeShow(echoElement, htmlElement, data, this.showViewHtml.bind(this, echoElement, htmlElement));

			return htmlElement;
		}
	}();

	proto.getHtml = function() {
		var echoElement = null;
		var htmlElement = null;
		return function(id_or_object, data, controllerClass, routeName, returnController) {
			var id = id_or_object;

			if (id_or_object !== null && typeof(id_or_object) === "object") {
				id = id_or_object.id || null;
				data = id_or_object.data || null;
				controllerClass = id_or_object.controllerClass || null;
				routeName = id_or_object.routeName || null;
				returnController = id_or_object.returnController || null;
			}

			var controller = null;
			var fragment = document.createElement("div");
			htmlElement = null;

			if ((typeof(controllerClass) !== "function" && typeof(routeName) === "string") || typeof(controllerClass) !== "function") {
				if (id !== null && typeof(controllerClass) !== "function") {
					DEBUG_WARN("Default controller used for : templates[ " + id + " ], perhaps it's normal !?");
				}

				controllerClass = this.mvcController.controllers.Default;
			}

			if (typeof(controllerClass) === "function") {
				//fragment = document.createElement("div");
				fragment.innerHTML = this.getEchoHidden(id, routeName);
				//echoElement 		= fragment.children[0];
				echoElement = fragment.childNodes[0];

				controller = this.mvcController.createController(controllerClass, routeName);
				controller.__init__(
					echoElement, data, this.getHtmlNext.bind(this, id, data, echoElement, controller, routeName)
				);

				if (returnController !== true) {
					return fragment.childNodes[0] || echoElement;
				}

				return controller;

			}

			if (id === null) {
				fragment.innerHTML = this.getHiddenHtml(id, routeName);
				htmlElement = fragment.childNodes[0];
			} else {
				fragment.innerHTML = this.get(id, data);
				htmlElement = fragment.children[0];
				this.applyHtmlData(htmlElement);
			}

			if (returnController !== true) {
				return htmlElement;
			}

			return controller;
		}
	}();

	return _construct;
}();