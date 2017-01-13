const config = {};

config.dico = {};
config.dico.minJs = "min.js";
config.dico.minCss = "min.css";

config.ARBO = {
	"source": "../src",
	"destination": "../dist",
	"src": {},
	"dist": {}
};

config.templates = {
	accesUrl :""
};

// --------- Src ---------
config.ARBO.src.appDir = config.ARBO.source + "/app/";

config.ARBO.src.appMvc = config.ARBO.src.appDir + "mvc/";
config.ARBO.src.appIndexHtml = config.ARBO.src.appDir + "index.html";
config.ARBO.src.appMvcAssets = config.ARBO.src.appMvc + "assets/";
config.ARBO.src.scssDir = config.ARBO.src.appMvc + "scss/";
config.ARBO.src.scss = config.ARBO.src.scssDir + "partial.scss";

config.ARBO.src.appMvcLangDir = config.ARBO.src.appMvc + "lng/";
config.ARBO.src.appMvcLang = config.ARBO.src.appMvcLangDir + "**/*.json";

config.ARBO.src.appMvcLibJs = config.ARBO.src.appMvc + "lib-js/";
config.ARBO.src.appMvcControllers = config.ARBO.src.appMvc + "controllers/";
config.ARBO.src.appMvcConfigDir = config.ARBO.src.appMvc + "config/";
config.ARBO.src.appMvcConfig = config.ARBO.src.appMvcConfigDir + "*.js";
config.ARBO.src.appMvcModels = config.ARBO.src.appMvc + "models/";

config.ARBO.src.appMvcMinJs = config.ARBO.src.appMvc + config.dico.minJs;
config.ARBO.src.appMvcSystemJs = config.ARBO.src.appMvc + "system-js/";
config.ARBO.src.__includeJs__ = config.ARBO.src.appMvc + "__include__.js";
config.ARBO.src.systemJsStart = config.ARBO.src.appMvcSystemJs + "jsStart.js";
config.ARBO.src.systemJsRequired = config.ARBO.src.appMvcSystemJs + "required/";
config.ARBO.src.systemJsEnd = config.ARBO.src.appMvcSystemJs + "jsEnd.js";

config.ARBO.src.appMvcTemplates = config.ARBO.src.appMvc + "templates/";
config.ARBO.src.templatesJst = [
	config.ARBO.src.appMvcTemplates + "**/*.jst"
]

config.ARBO.src.jsFoldersMinify =
	[
		config.ARBO.src.appMvcLibJs, config.ARBO.src.systemJsStart, config.ARBO.src.systemJsRequired, config.ARBO.src.appMvcControllers, config.ARBO.src.appMvcModels, config.ARBO.src.appMvcConfigDir, config.ARBO.src.systemJsEnd
	]

// --------- Dist ---------
config.ARBO.dist.appDir = config.ARBO.destination + "/app/";
config.ARBO.dist.appMvc = config.ARBO.dist.appDir + "mvc/";
config.ARBO.dist.appIndexHtml = config.ARBO.dist.appDir + "index.html";
config.ARBO.dist.appMvcAssets = config.ARBO.dist.appMvc + "assets/";
config.ARBO.dist.cssMin = config.ARBO.dist.appMvc + config.dico.minCss;
config.ARBO.dist.appMvcMinJs = config.ARBO.dist.appMvc + config.dico.minJs;
config.ARBO.dist.appMvcLangDir = config.ARBO.dist.appMvc + "lng/";
config.ARBO.dist.appMvcLang = config.ARBO.dist.appMvcLangDir + "**/*.json";

config.ARBO.dist.appMvcTemplates = config.ARBO.dist.appMvc + "templates/";
config.ARBO.dist.allTemplatesJst = config.ARBO.dist.appMvcTemplates + "**/*+(.jst)"
config.ARBO.dist.templatesJst = config.ARBO.dist.appMvcTemplates + "**/*.jst";
config.ARBO.dist.__includeJs__ = config.ARBO.dist.appMvc + "__include__.js";

module.exports = config