var plugins = require("gulp-load-plugins")();
var uniqid = require('uniqid');

var initTask = function(taskArgs) {

	taskArgs.gulp.task("scriptsJsMinLocal", function() {
		return taskArgs.gulp.src(taskArgs.ARBO.dist.appMvcMinJs)
			.pipe(plugins.uglify())
			.pipe(taskArgs.gulp.dest(taskArgs.ARBO.dist.appMvc));
	});

	taskArgs.gulp.task("scriptsJsMin", taskArgs.gulp.series("scriptsJs","scriptsJsMinLocal", function(done) {
		done();
	}));
};

module.exports = {
	initTask: initTask
};