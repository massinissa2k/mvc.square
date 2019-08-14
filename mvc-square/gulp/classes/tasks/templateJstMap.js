const path = require("path");
const plugins = require("gulp-load-plugins")();
const fs = require("fs");

var initTask = function(taskArgs) {
	taskArgs.gulp.task('templateJstMap', () => {
		var filesPath = null;
		var dirPathFile = null;
		var uriSpliced = null;
		var currSrc = null;
		var deviceType = null;
		var tmplOut = {};
		var dPathArrL = null;
		var strOutOrig = "var MVC_IS_DEBUG_MODE = " + MVC_IS_DEBUG_MODE + ";var TEMPLATES_DATA = ";
		var strOut = strOutOrig;

		return taskArgs.gulp.src(taskArgs.ARBO.src.templatesJst)
			.on("data", (src) => {

				currSrc = src["history"][0].replace(src["base"], "");

				//fix windows
				var find = "\\" + path.sep;
				var re = new RegExp(find, 'g');
				currSrc = currSrc.replace(re, "/");
				currSrc = currSrc.replace(/^\//g, "");
				uriSpliced = currSrc.split("/");
				dPathArrL = uriSpliced.length;

				//console.log( uriSpliced[ 0 ] );
				deviceType = uriSpliced[0];

				if (typeof(tmplOut[deviceType]) === "undefined") {
					tmplOut[deviceType] = {};
				}

				filesPath = currSrc;
				uriSpliced.splice(-1);
				uriSpliced.shift();
				uriSpliced.push(path.basename(filesPath, '.jst'));
				dirPathFile = uriSpliced.join("/");
				tmplOut[deviceType][dirPathFile] = taskArgs.config.templates.accesUrl+"mvc/templates/" + filesPath;

			}).on("end", () => {
				strOut += JSON.stringify(tmplOut) + ";";
				fs.writeFileSync(taskArgs.ARBO.src.appMvcConfigDir + "templates.js", strOut);
				tmplOut = {};
				strOut = strOutOrig;
			});
	});
};

module.exports = {
	initTask: initTask
};