var plugins 	= require("gulp-load-plugins")();

var initTask = function( taskArgs )
{
	taskArgs.gulp.task( "duplicateLanguages", function()
	{
		return taskArgs.gulp.src( [ taskArgs.ARBO.src.appMvcLang ] )
		.pipe( plugins.jsonminify() )
		.pipe( taskArgs.gulp.dest( taskArgs.ARBO.dist.appMvcLangDir ) );
	});
};

module.exports =
{
	initTask : initTask
};