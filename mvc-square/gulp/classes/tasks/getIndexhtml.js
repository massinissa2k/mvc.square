var initTask = function( taskArgs )
{
	taskArgs.gulp.task( "getIndexhtml", function()
	{
		return taskArgs.gulp.src( taskArgs.ARBO.src.appIndexHtml ).pipe( taskArgs.gulp.dest( taskArgs.ARBO.dist.appDir ) );
	});
};

module.exports =
{
	initTask : initTask
};