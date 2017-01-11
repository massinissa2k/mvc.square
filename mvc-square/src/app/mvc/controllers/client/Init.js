controllers.Init = function() {
	class Init extends controllers.Default {
		onShow(tmpl, htmlElement, data, next) {
			//this.parent.virtualUrl.switchUrl("home", 'pages');
			setTimeout(next,2000);
			return false;
		}
	}
	return Init;
}();