var TmplContext = function(){
	var htmlreplaceable = null;
	class TmplContext{
		constructor(parent, plainText, _htmlreplaceable){
			this.parent = parent;
			htmlreplaceable = htmlreplaceable||_htmlreplaceable;

			this.sharedContext = {}
			this.sharedContext["_$_"] = {};
			this.sharedContext["config"] = mvc.config;
			this.sharedContext["_CONST.LNG.tmplKey"] = mvc.lng;
			this.sharedContext["userAgent"] = {};
			this.sharedContext["utils"] = mvc.utils;
			this.sharedContext["routes"] = mvc.routes;
			this.sharedContext["templates"] = this.parent.templatesList;
			this.sharedContext["mvc"] = mvc;
			this.sharedContext["controllers"] = mvc.controllers;
			this.sharedContext["get"] = this.parent._get.bind(parent);
			this.sharedContext["getHtml"] = this.parent.getHtml.bind(parent);
			this.sharedContext["goto"] = this.goto.bind(this);
			this.sharedContext["echo"] = this.echo.bind(this);
			this.sharedContext["onclick"] = this.onclick.bind(this);

			this.tjs = new Tjs(this.sharedContext);
			let tjsFun = this.tjs.compile(plainText);
			return tjsFun;
		}

		goto(path, routeGroupe){
			return (getWinMvc() + ".mainMvc.virtualUrl.switchUrl(\'" + path + "\',\'" + (routeGroupe || "") + "\')");
		}

		echo(data){
			if (data instanceof HTMLElement || data instanceof Comment || data instanceof SVGElement) {
				let htmlId = this.parent.pushHtmlElement(data);
				this.tjs.bufferAdd("<tpl id='"+htmlId+"' class='" + htmlreplaceable + "'></tpl>");
				return;
			}

			this.tjs.bufferAdd(data);
			//this.buffer += data;
			return;
		}

		onclick(action){
			return "onclick=\"return false, " + action + "\"";
		}
	}

	return TmplContext;
}();