(function() {
	"use strict";
	var __GLOBALS__ = {};

	var _CONFIG = null;
	var _UTILS = null;
	//var controllers 	= { Default : function(){} };
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
		lng: null //default acces to get trad by key that can be changed from const.js
			,
		userAgent: null,
		noClickable: false
	};

	function mvcPublic(proto, functionName, _function_) {
		proto[functionName] = _function_;
	}

	var getWinMvc = function() {
		window.accessMVC = window.accessMVC || [];
		window.accessMVC.push(mvc);
		var MVCID = window.accessMVC.length - 1;

		return function() {
			return "window.accessMVC[" + MVCID + "]";
		}

	}();

	var _extends_ = function() {
		var J = null;
		return function(proto, obj, ifNotExist) {
			if (ifNotExist === true) {
				for (J in obj) {
					if (typeof(proto[J]) === "undefined") {
						proto[J] = obj[J];
					}
				}

				return;
			}

			for (J in obj) {
				proto[J] = obj[J];
			}

			return;
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