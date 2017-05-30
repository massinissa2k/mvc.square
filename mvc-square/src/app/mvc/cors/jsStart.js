(function() {
	"use strict";
	var __GLOBALS__ = {};
	var _CONFIG = null;
	var _UTILS, Utils, nsUtils;
	_UTILS = Utils = nsUtils = {};
	var controllers = {};
	var models = {};
	var mvc = {
		config: _CONFIG,
		mainMvc: null,
		utils: _UTILS,
		controllers: controllers,
		models: models,
		routes: null,
		model: null,
		lng: null,//default access to get the traduction by key, that can be changed from const.js
		userAgent: null,
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
	// @exec include("cors/required/**/*.js") 
	// @exec include("controllers/**/*.js") 
	// @exec include("models/**/*.js") 
	// @exec include("config/**/*.js") 
})();