var Tmpl = function() {
	var htmlreplaceable = null;

	var hiddenHtml = "<tpl_replace></tpl_replace>";
	var echoHidden = "<echo_replace></echo_replace>";
	var fragment = document.createElement("div");
	(function() {
		var c = document.createComment("_");
		if (typeof(c.parentElement) !== "undefined" && c.parentElement === null) {
			hiddenHtml = echoHidden = "<!--_-->";
		}
	})();

	class Tmpl{
		constructor(parent, templatesList, tmplHelpers, next){
			this.parent = parent;
			this.main = this.parent;
			this.tmplHelpers = tmplHelpers;
			this.mvcController = null;
			this.templatesList = templatesList;
			this.templatesReady = {};
			this.saveById = {};
			this.next = next;
			//this._echo_ 			= this._echoBind.bind( this );
			this.htmlElementExistLength = 0;
			this.htmlElementExtractedLength = 0;
			this.htmlElementList = {};
			htmlreplaceable = htmlreplaceable || "html" + _UTILS.uniqid();

			this.buildAll();
		}

		setMvcController(mvcController){
			this.mvcController = mvcController;
		}

		buildOut(){
			setTimeout(()=>{
				for (var J in this.templatesReady) {
					this.build(this.templatesReady[J].id, this.templatesReady[J].tpl);
				}

				this.next(true);
			},0);
			
		}

		buildAll(){
			let tmplValues = [];
			let tmplKeys = [];
			
			for(var J in this.templatesList){
				tmplKeys.push(J);
				tmplValues.push(this.templatesList[J]);
			}

			let files = new FilesLoader(tmplValues).load();
			files.then((datas)=>{
				
				for(let data in datas){
					let val = datas[data];
					this.templatesReady[tmplKeys[tmplValues.indexOf(val[0])]] = {
		 				id: tmplKeys[tmplValues.indexOf(val[0])],
		 				url: val[0],
		 				tpl: val[1]
		 			};
				}

				this.buildOut();
			}).catch((why)=>{
				DEBUG_WARN(why);
			});
		}

		pushHtmlElement(elem){
			var htmlId = "htmlreplace_" + (_UTILS.uid());
			this.htmlElementList[htmlId] = elem;
			this.htmlElementExistLength++;
			return htmlId;
		}

		extractHtmlElement(id){
			var elem = null;
			elem = this.htmlElementList[id];
			this.htmlElementList[id] = null;
			return elem;
		}

		build(id, str, rebuild){

			if (id === null && typeof(id) !== "undefined") {
				DEBUG_WARN("Request template id");
				return false;
			}

			if (rebuild !== true && typeof(this.saveById[id]) === "function") {
				return true;
			}

			this.saveById[id] = new TmplContext(this, str, htmlreplaceable);
			return true;
		}

		buildGet(id, str, data){
			this.build(id, str);
			return this.get(id, data);
		}

		execScript(id, data){
			if (typeof(this.saveById[id]) === "function") {
				return this.saveById[id](data);
			}

			DEBUG_WARN("unbuilded template " + id);
			return false;
		}

		get(id, data, concatBuffer){
			if (id === null && typeof(id) !== "undefined") {
				DEBUG_WARN("Request template id");
				return false;
			}

			return this.execScript(id, data);
		}

		getFragment(id, data){
			fragment.innerHTML = this.get(id, data);
			return fragment.children[0];
		}

		getHtmlFromFragment(htmlElement){
			var htmlreplaceableElems = null;
			var i = 0;
			var L = 0;

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

		//befor onApplyHtmlData ??
		applyHtmlData(htmlElement){
			var htmlreplaceableElems = null;
			var i = 0;
			var L = 0;
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

		showViewHtml(echoElement, htmlElement){
			if (echoElement.parentElement !== null) {
				echoElement.parentElement.replaceChild(htmlElement, echoElement);
			}
		}

		getHiddenHtml(id, routeName){
			//return "<span tmplid='"+id+"' style='display:none!important' ></span>";
			return hiddenHtml;
		}

		getEchoHidden(id, routeName){
			//return "<span tmplid='"+id+"' style='display:none!important' ></span>";
			//return "<!---->";
			return hiddenHtml;
		}

		getHtmlNext(id, data, echoElement, ct, routeName){
			var htmlElement = null;
			var fragment = document.createElement("div");
			
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

		getHtml(id_or_object, data, controllerClass, routeName, returnController){
			var echoElement = null;
			var htmlElement = null;
			var id = id_or_object;
			var controller = null;
			var fragment = document.createElement("div");

			if (id_or_object !== null && typeof(id_or_object) === "object") {
				id = id_or_object.id || null;
				data = id_or_object.data || null;
				controllerClass = id_or_object.controllerClass || null;
				routeName = id_or_object.routeName || null;
				returnController = id_or_object.returnController || null;
			}

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
	}

	return Tmpl;
}();