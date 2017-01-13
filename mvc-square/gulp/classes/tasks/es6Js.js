const plugins = require("gulp-load-plugins")();
const glob = require('glob');
const fs = require('fs');
const babel = require('gulp-babel');
const es2015 = require('babel-preset-es2015');

const initTask = function(taskArgs) {
	taskArgs.gulp.task("es6Js", () => {
		var _stream = taskArgs.gulp.src(taskArgs.ARBO.src.appMvc+"/Core.js")
		.pipe(babel({
			presets: [es2015]
		}))
		.pipe(taskArgs.gulp.dest(taskArgs.ARBO.dist.appMvc));
		return _stream;
	});
};

module.exports = {
	initTask: initTask
};