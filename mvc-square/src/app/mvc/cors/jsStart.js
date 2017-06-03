(function() {
	"use strict";
	var mvc = {
		config: null,
		mainMvc: null,
		utils: {},
		controllers: {},
		models: {},
		routes: null,
		model: null,
		lng: null, //default access to get the traduction by key, that can be changed from const.js
		userAgent: null,
		addModel: (cName, model) => {
			mvc.models[cName] = model;
		},
		addController: (cName, ct) => {
			mvc.controllers[cName] = ct;
		}
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