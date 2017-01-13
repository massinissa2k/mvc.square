const clean = require('gulp-clean');

const initTask = function(taskArgs) {
	taskArgs.gulp.task("clean", () => {
		return taskArgs.gulp.src(taskArgs.ARBO.dist.appDir, {
				read: false
			})
			.pipe(clean({
				force: true
			}));
	});
};

module.exports = {
	initTask: initTask
};