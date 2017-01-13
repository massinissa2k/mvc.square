(function() {
	"use strict";
	var __GLOBALS__ = {};
	var _CONFIG = null;
	var _UTILS = null;
	var controllers = {};
	var models = {};
	var mvc = {
		config: _CONFIG,
		mainMvc: null,
		utils: null,
		controllers: controllers,
		models: models,
		routes: null,
		model: null,
		lng: null,//default acces to get trad by key that can be changed from const.js
		userAgent: null,
		noClickable: false
	};

	var getWinMvc = function() {
		window.accessMVC = window.accessMVC || [];
		window.accessMVC.push(mvc);
		var MVCID = window.accessMVC.length - 1;

		return function() {
			return "window.accessMVC[" + MVCID + "]";
		}

	}();

	function DEBUG_WARN() {
		if (MVC_IS_DEBUG_MODE === true) {
			console.warn("DEBUG MODE MESSAGE : ");
			console.warn.apply(console, arguments);
		}
	}

	// @exec include("lib-js/**/*.js")
	// @exec include("system-js/required/**/*.js") 
	// @exec include("controllers/**/*.js") 
	// @exec include("models/**/*.js") 
	// @exec include("config/**/*.js") 

	_UTILS = new Utils();
	mvc.utils = _UTILS;
})();