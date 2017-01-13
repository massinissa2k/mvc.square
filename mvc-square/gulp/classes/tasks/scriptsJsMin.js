const plugins = require("gulp-load-plugins")();
const uniqid = require('uniqid');
const babel = require('gulp-babel');
const es2015 = require('babel-preset-es2015');

const initTask = function(taskArgs) {

	taskArgs.gulp.task("scriptsJsMinLocal", () => {
		return taskArgs.gulp.src(taskArgs.ARBO.dist.appMvcMinJs)
			.pipe(babel({
						presets: [es2015]
					}))
			.pipe(plugins.uglify())
			.pipe(taskArgs.gulp.dest(taskArgs.ARBO.dist.appMvc));
	});

	taskArgs.gulp.task("scriptsJsMin", taskArgs.gulp.series("scriptsJs", "scriptsJsMinLocal", (done) => {
		done();
	}));
};

module.exports = {
	initTask: initTask
};