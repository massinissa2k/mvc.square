const plugins = require("gulp-load-plugins")();

const initTask = function(taskArgs) {
	taskArgs.gulp.task("duplicateLanguages", () => {
		return taskArgs.gulp.src([taskArgs.ARBO.src.appMvcLang])
			.pipe(plugins.jsonminify())
			.pipe(taskArgs.gulp.dest(taskArgs.ARBO.dist.appMvcLangDir));
	});
};

module.exports = {
	initTask: initTask
};