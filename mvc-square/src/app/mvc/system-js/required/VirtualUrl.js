var VirtualUrl = function ()
{
	var _construct = function ( parent , routes , tmplEngine )
	{
		this.parent 		= parent;
		this.routes 		= routes;
		this.tmplEngine 	= tmplEngine;

		this.routesManagers = {};

		this.setRouteManager( this.routes );
		window.addEventListener( "hashchange" , this.hashchange.bind( this ) , true );
	};

	var proto = _construct.prototype;

	proto.hashchange = function( e )
	{
		for( var J in this.routes )
		{
			this.routesManagers[ J ].hashchange();
		}
	};

	proto.setRouteManager = function( routes )
	{
		for( var J in routes )
		{
			this.routesManagers[ J ] = new RouteManager( this , routes[ J ] , J );
		}
	};

	proto.add = function( controller , routeName )
	{
		if( ( routeName in this.routesManagers ) === false )
		{
			console.warn( routeName+" route name does not exist !" );
			return false;
		}

		this.routesManagers[ routeName ].manage( controller , routeName );
	};

	proto.switchUrl = function( path , routeName )
	{
		if( ( routeName in this.routesManagers ) === true )
		{
			this.routesManagers[ routeName ].urlManager.switchUrl( path );
			return false;
		}

		UrlManager.prototype.switchUrlAll( path );
		
		return false;
	};

	return _construct;
}();
