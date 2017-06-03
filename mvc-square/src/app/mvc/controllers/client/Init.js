(() => {
	class Init extends mvc.controllers.Default {

		constructor( parent , tmplEngine ){
			super();
			this.parent = parent;
			this.tmplEngine = tmplEngine;
		}

		onShow(tmpl, htmlElement, data, next) {
			//this.parent.virtualUrl.switchUrl("home", 'pages');
			//setTimeout(next,2000);
			//return false;
		}
	}
	mvc.addController("Init", Init);
})();