//var gulp = require('gulp-help')(require('gulp'));
const gulp = require('gulp');
const gutil = require("gulp-util");
const util = require("util");
const tasksPath = __dirname + '/classes/tasks/';
const configPath = __dirname + '/classes/config.js';
const config = require(configPath);
const options = require("minimist")(process.argv.slice(2));

const onErrors = function(err) {
	gutil.beep();
	gutil.log(err);
};

const ulog = function(obj, depth) {
	console.log(util.inspect(obj, false, depth, true));
};

global.ulog = ulog;
global.MVC_IS_DEBUG_MODE = "true";

const taskArgs = {
	gulp: gulp,
	config: config,
	ARBO: config.ARBO,
	options: options,
	onErrors: onErrors
}

const tasks = {};
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
tasks.es6Js = require(tasksPath + "/es6Js.js");

Object.keys(tasks).forEach((key) => {
	tasks[key].initTask(taskArgs);
});

const toWatchES6Dev = [
	config.ARBO.src.appMvc + "Core.js",
	config.ARBO.src.appMvc + "core-js/**/*.js"
];

const toWatchJSDev = [
	config.ARBO.src.appMvc + "config/*.js",
	"!" + config.ARBO.src.appMvc + "config/templates.js",
	config.ARBO.src.appMvc + "controllers/*.js",
	config.ARBO.src.appMvc + "controllers/**/*.js",
	config.ARBO.src.appMvc + "lib-js/*.js",
	config.ARBO.src.appMvc + "lib-js/**/*.js",
	config.ARBO.src.appMvc + "models/*.js",
	config.ARBO.src.appMvc + "models/**/*.js",
	config.ARBO.src.appMvc + "cors/*.js",
	config.ARBO.src.appMvc + "cors/**/*.js"
];

const toWatchDevScss = [
	config.ARBO.src.scssDir + "*.scss",
	config.ARBO.src.scssDir + "**/*.scss"
];

const toWatchDev = [
	config.ARBO.src.appDir + "index.html",
	toWatchDevScss,
	config.ARBO.src.templatesJst,
	toWatchJSDev,
];

gulp.task("switchToProd", (done) => {
	MVC_IS_DEBUG_MODE = "false";
	done();
});

const debugSeries = gulp.series("getIndexhtml",
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

const buildSeries = gulp.series("getIndexhtml",
	"switchToProd",
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

const watchSeries = gulp.series("getIndexhtml",
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

gulp.task("watchcss", () => {
	gulp.watch(toWatchDevScss, gulp.parallel("css"));
});

gulp.task("watchjs", () => {
	gulp.watch(toWatchJSDev, gulp.parallel(["scriptsJs"]));
});

gulp.task("watchEs6", () => {
	gulp.watch(toWatchES6Dev, gulp.parallel(["es6Js"]));
});

//gulp.task("default", ["help"]);