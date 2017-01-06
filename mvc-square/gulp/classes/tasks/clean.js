var clean = require('gulp-clean');

var initTask = function( taskArgs )
{
	taskArgs.gulp.task( "clean", function()
	{
		return taskArgs.gulp.src( taskArgs.ARBO.dist.appDir  , {read: false} )
			.pipe(clean( { force: true }) );
	});
};

module.exports =
{
	initTask : initTask
};