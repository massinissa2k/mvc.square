var Controller = function ()
{
	var _construct = function ( parent , tmplEngine , viewElem , controllers , routes , templateName )
	{
		this.parent 		= parent;
		this.templateName 	= templateName;
		this.controllers 	= controllers;
		this.isMain 		= true;
		this.viewElem 		= viewElem;
		this.tmplEngine 	= tmplEngine;
		this.routes 		= routes;
		this.virtualUrl		= this.parent.virtualUrl;

		if( this.parent instanceof( MainMvc ) === false )
		{
			this.isMain = false;
			DEBUG_WARN( "is not MainMvc" );
		}else
		{
			this.mainMvc = this.parent; 
		}

		for( var J in this.controllers )
		{
			if( J === "Default" || J === "DefaultController" )
			{
				continue;
			}

			_extends_( this.controllers[ J ].prototype , this.controllers.Default.prototype , true );

		}

	};

	var proto = _construct.prototype;

	proto.init = function()
	{
		var m = this.tmplEngine.getHtml( this.templateName , {} , this.controllers.MainView );
		this.viewElem.appendChild( m );
		this.virtualUrl.hashchange();
	};

	var ctI = 0;
	var ctLsI = 0;
	var a = null;
	proto.createController = function()
	{
		var ct = null;
		return function( controllerClass , routeName )
		{
			ct = new controllerClass( this , this.tmplEngine , routeName );
			ct.parent = this;
			ct.beforeInit();
			if( typeof( routeName ) === "string" )
			{
				ctI++;
				clearTimeout(a);

				a = setTimeout( function()
				{
					//console.log( ctI );
					ctI = 0;
				}, 200 );

				this.virtualUrl.add( ct , routeName );
			}

			ct.superController = this;

			return ct;
		}
	}();

	return _construct;
}();
