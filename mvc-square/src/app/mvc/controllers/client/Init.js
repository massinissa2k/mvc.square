controllers.Init = function() {
	class Init extends controllers.Default {

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
	return Init;
}();