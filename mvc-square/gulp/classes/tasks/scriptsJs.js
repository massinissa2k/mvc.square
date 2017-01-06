var plugins 	= require("gulp-load-plugins")();
var uniqid 		= require('uniqid');
var glob 		= require('glob');
var fs 			= require('fs');

var initTask = function( taskArgs )
{
	taskArgs.gulp.task( "scriptsJs", function()
	{
		var _stream = taskArgs.gulp.src( taskArgs.ARBO.src.__includeJs__ )
		.pipe(	plugins.preprocess(
		{
			context:
			{
				include: function( path )
				{
					var files = glob.sync(taskArgs.ARBO.src.appMvc+path, {});
					files.forEach( ( e , i ) =>
					{
						files[ i ] = "/* @include "+ files[ i ].replace( path , "" ) +"*/";
					});

					return files.join( " \n " );
				}
			}
		}))
		.on("end" , function()
		{
			fs.writeFileSync( taskArgs.ARBO.src.appMvcMinJs , "" );
			taskArgs.gulp.src( taskArgs.ARBO.src.appMvcMinJs )
			.pipe( plugins.preprocess( { includeBase : "./" } ) )
			.pipe( taskArgs.gulp.dest( taskArgs.ARBO.dist.appMvc ) )
			.on( "end" ,()=>{
				fs.unlinkSync(taskArgs.ARBO.src.appMvcMinJs);
			});
		})
		.pipe( plugins.rename( taskArgs.config.dico.minJs ) )
		.pipe( taskArgs.gulp.dest( taskArgs.ARBO.src.appMvc ) );
		return _stream;
	});
};

module.exports =
{
	initTask : initTask
};