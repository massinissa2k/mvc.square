window.MainMvc = function() {

	function setDefaultPage() {
		var defaultPageName = mainRoutes.defaultPageName;
		delete mainRoutes.defaultPageName;

		if (window.location.hash === "" || window.location.hash === "#") {
			window.location.hash = defaultPageName || "";
		}
	}

	class MainMvc {
		constructor(parent, rootElem, templateName) {
			mvc.mainMvc = this;
			this.parent = parent;
			this.rootElem = rootElem;
			this.templateName = templateName;
			this.userConfig = userConfig;
			this.language = new Language(this);
			this.routes = mvc.routes = mainRoutes;
			this.virtualUrl = null;
			this.tmplEngine = null;
			this.controller = null;
			this.models = null;
			this.config = mvc.config = new Config(this);

			setDefaultPage();

			mvc.userAgent = this.userAgent = new UserAgent(this).userAgent;

			this.config.setTemplates();

			var prms = [];
			prms.push(this.language.init());

			this.tmplEngine = new Tmpl(this, this.config.getTemplates());
			prms.push(this.tmplEngine.init());

			Promise.all(prms).then(()=>{
				this.init();
			});
		}

		init() {
			mvc.lng = this.language.getLngByName.bind(this.language);

			this.virtualUrl = new VirtualUrl(this, this.routes, this.tmplEngine);
			this.models = new Models(this, mvc.models);

			this.controller = new Controller(this, this.tmplEngine, this.rootElem, mvc.controllers, this.routes, this.templateName);
			this.tmplEngine.setController(this.controller);
			this.controller.init();
		}

	}

	return MainMvc;
}();