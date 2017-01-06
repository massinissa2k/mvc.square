controllers.DefaultController = controllers.Default = function()
{
	var _construct = function()
	{
		this.parent = parent;
	};

	var proto = _construct.prototype;

	proto.__init__ = function( templateElement , data , next )
	{
		this.beforeCreate( templateElement , data , next );
	};

	proto.beforeInit = function()
	{
		this.ctId = this.ctId||_UTILS.uniqid();
	};

	proto.beforeCreate = function( templateElement , data , next )
	{
		this.templateElement = templateElement;
		if( this.onCreate( templateElement , data , next ) !== false )
		{
			next();
			return;
		}
		return;
	};

	proto.beforeShow = function( templateElement , htmlElement , data , next )
	{
		this.htmlElement 		= htmlElement;

		this.templateElement 	= templateElement;

		if( this.onShow( templateElement , htmlElement , data , next ) !== false )
		{
			next();
			return;
		}
		return;
	};

	proto.beforeSwapViewIn = function( oldController , next )
	{
		if( this.onSwapViewIn( oldController , oldController.beforeSwapViewOut.bind( oldController , this , next ) ) !== false )
		{
			oldController.beforeSwapViewOut( this , next );
			return;
		}
		return;
	};

	proto.beforeSwapViewOut = function( newController , next )
	{
		if( this.onSwapViewOut( newController , next ) !== false )
		{
			next();
			return;
		}
		return;
	};

	var onCreate = function( domPositionElem , data , next )
	{
		return true;
	};

	var onShow = function( tmpl , htmlElement , data , next )
	{
		//console.log(this.htmlElement);
		return true;
	};

	var onSwapViewIn = function( oldController , next )
	{
		return true;
	};

	var onSwapViewOut = function( newController , next )
	{
		return true;
	};

	mvcPublic( proto , "onCreate" , onCreate );
	mvcPublic( proto , "onShow" , onShow );
	mvcPublic( proto , "onSwapViewIn" , onSwapViewIn );
	mvcPublic( proto , "onSwapViewOut" , onSwapViewOut );

	return _construct;
}();