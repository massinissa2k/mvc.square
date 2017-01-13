const plugins = require("gulp-load-plugins")();

const initTask = function(taskArgs) {
	taskArgs.gulp.task("cssminLocal", () => {
		return taskArgs.gulp.src(taskArgs.ARBO.dist.cssMin)
			.pipe(plugins.csso())
			.pipe(plugins.rename("min.css"))
			.pipe(taskArgs.gulp.dest(taskArgs.ARBO.dist.appMvc));
	});

	taskArgs.gulp.task("cssmin", taskArgs.gulp.series("css", "cssminLocal", function(done) {
		done();
	}));
};

module.exports = {
	initTask: initTask
};