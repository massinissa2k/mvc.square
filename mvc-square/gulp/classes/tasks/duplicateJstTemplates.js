const initTask = function(taskArgs) {
	taskArgs.gulp.task("duplicateJstTemplates", () => {
		return taskArgs.gulp.src(taskArgs.ARBO.src.templatesJst).pipe(taskArgs.gulp.dest(taskArgs.ARBO.dist.appMvcTemplates));
	});
};

module.exports = {
	initTask: initTask
};