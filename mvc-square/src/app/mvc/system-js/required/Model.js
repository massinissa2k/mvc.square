var Model = function ()
{
	var _construct = function ( parent , models )
	{
		this.parent 	= parent;
		this.main 		= parent;
		this.models		= models;

		this.modelsCreated = {};

		this.initModels( this.models );

	};

	var proto = _construct.prototype;

	proto.load = function( modelName )
	{
		if( ( modelName in this.modelsCreated ) === false )
		{
			if( ( modelName in this.models ) === false )
			{
				console.warn( "Model "+modelName+" does not exist!" );
				return null;
			}

			this.modelsCreated[ modelName ] = new this.models[ modelName ]( this );

		}

		return this.modelsCreated[ modelName ];

	};

	proto.methodes = 
	{
		reload : function()
		{
			console.log( "test reload" );
		}
	};

	proto.initModels = function( models )
	{
		for( var J in models )
		{
			_extends_( models[ J ].prototype , proto.methodes );
		}
	};

	return _construct;
}();
