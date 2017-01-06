var plugins = require("gulp-load-plugins")();

var initTask = function( taskArgs )
{
	taskArgs.gulp.task("css", function ()
	{
		return taskArgs.gulp.src( taskArgs.ARBO.src.scss )
			.pipe( plugins.plumber({ errorHandler: taskArgs.onErrors }) )
			.pipe( plugins.sass() )
			.pipe( plugins.csscomb() )
			.pipe( plugins.cssbeautify({indent: "	"}) )
			.pipe( plugins.autoprefixer() )
			.pipe( plugins.concat( "min.css" ) )
			.pipe( taskArgs.gulp.dest( taskArgs.ARBO.dist.appMvc ) );
	});
};

module.exports =
{
	initTask : initTask
};