//var gulp = require('gulp-help')(require('gulp'));
var gulp = require('gulp');
var gutil = require("gulp-util");
var util = require("util");
var tasksPath = __dirname + '/classes/tasks/';
var configPath = __dirname + '/classes/config.js';
var config = require(configPath);
var options = require("minimist")(process.argv.slice(2));

var onErrors = function(err) {
	gutil.beep();
	gutil.log(err);
};

var ulog = function(obj, depth) {
	console.log(util.inspect(obj, false, depth, true));
};

global.ulog = ulog;
global.MVC_IS_DEBUG_MODE = "false";

var taskArgs = {
	gulp: gulp,
	config: config,
	ARBO: config.ARBO,
	options: options,
	onErrors: onErrors
}

var tasks = {};
tasks.clean = require(tasksPath + "/clean.js");
tasks.duplicateAssets = require(tasksPath + "/duplicateAssets.js");
tasks.optimizeImages = require(tasksPath + "/optimizeImages.js");
tasks.duplicateJstTemplates = require(tasksPath + "/duplicateJstTemplates.js");
tasks.regExpFinalTemplates = require(tasksPath + "/regExpFinalTemplates.js");
tasks.duplicateLanguages = require(tasksPath + "/duplicateLanguages.js");
tasks.duplicateIndexhtml = require(tasksPath + "/getIndexhtml.js");
tasks.css = require(tasksPath + "/css.js");
tasks.cssmin = require(tasksPath + "/cssmin.js");
tasks.templateJstMap = require(tasksPath + "/templateJstMap.js");
tasks.scriptsJs = require(tasksPath + "/scriptsJs.js");
tasks.scriptsJsMin = require(tasksPath + "/scriptsJsMin.js");

Object.keys(tasks).forEach((key) => {
	tasks[key].initTask(taskArgs);
});

var toWatchJSDev = [
	config.ARBO.src.appMvc + "config/*.js",
	"!"+config.ARBO.src.appMvc + "config/templates.js",
	config.ARBO.src.appMvc + "controllers/*.js",
	config.ARBO.src.appMvc + "controllers/**/*.js",
	config.ARBO.src.appMvc + "lib-js/*.js",
	config.ARBO.src.appMvc + "lib-js/**/*.js",
	config.ARBO.src.appMvc + "models/*.js",
	config.ARBO.src.appMvc + "models/**/*.js",
	config.ARBO.src.appMvc + "system-js/*.js",
	config.ARBO.src.appMvc + "system-js/**/*.js"
];
var toWatchDevScss = [
	config.ARBO.src.scssDir + "*.scss",
	config.ARBO.src.scssDir + "**/*.scss"
];

var toWatchDev = [
	config.ARBO.src.appDir + "index.html",
	toWatchDevScss,
	config.ARBO.src.templatesJst,
	toWatchJSDev,
];

var debugSeries = gulp.series("getIndexhtml",
	"css",
	"duplicateAssets",
	"duplicateLanguages",
	"templateJstMap",
	"duplicateJstTemplates",
	"regExpFinalTemplates",
	"scriptsJs",
	(done) => {
		done();
	});

var buildSeries = gulp.series("getIndexhtml",
	"cssmin",
	"duplicateAssets",
	"optimizeImages",
	"duplicateLanguages",
	"templateJstMap",
	"duplicateJstTemplates",
	"regExpFinalTemplates",
	"scriptsJsMin",
	(done) => {
		done();
	});

var watchSeries = gulp.series("getIndexhtml",
	"css",
	"duplicateAssets",
	"duplicateLanguages",
	"templateJstMap",
	"duplicateJstTemplates",
	"regExpFinalTemplates",
	"scriptsJs",
	(done) => {
		gulp.watch(toWatchDev, debugSeries);
		done();
	});

gulp.task("build", buildSeries);

gulp.task("debug", debugSeries);

gulp.task("watch", watchSeries);

gulp.task("watchcss",()=>{
	gulp.watch(toWatchDevScss, gulp.parallel("css"));
});

gulp.task("watchjs",()=>{
	gulp.watch(toWatchJSDev, gulp.parallel(["scriptsJs"]));
});

//gulp.task("default", ["help"]);