const initTask = function(taskArgs) {
	taskArgs.gulp.task("duplicateAssets", () => {
		return taskArgs.gulp.src([taskArgs.ARBO.src.appMvcAssets + "**/*"])
			.pipe(taskArgs.gulp.dest(taskArgs.ARBO.dist.appMvcAssets));
	});
};

module.exports = {
	initTask: initTask
};