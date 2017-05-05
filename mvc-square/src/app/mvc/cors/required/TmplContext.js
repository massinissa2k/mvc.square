var TmplContext = function(){
	var htmlreplaceable = null;
	class TmplContext{
		constructor(parent, plainText, _htmlreplaceable){
			this.parent = parent;
			htmlreplaceable = htmlreplaceable||_htmlreplaceable;
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

			this.tjs = new Tjs();
			return new Function("mvc", "_$_", this.tjs.build(plainText) ).bind(this, mvc);
		}

		goto(path, routeGroupe){
			return (getWinMvc() + ".mainMvc.virtualUrl.switchUrl(\'" + path + "\',\'" + (routeGroupe || "") + "\')");
		}

		echo(data){
			if (data instanceof HTMLElement || data instanceof Comment || data instanceof SVGElement) {
				var htmlId = this.parent.pushHtmlElement(data);
				this.buffer += "<tpl id='"+htmlId+"' class='" + htmlreplaceable + "'></tpl>";
				return;
			}

			this.buffer += data;
			return;
		}

		onclick(action){
			return "onclick=\"return false, " + action + "\"";
		}
	}

	return TmplContext;
}();