var Language = function()
{
	var _construct = function ( parent )
	{
		this.parent 		= parent;
		this.userConfig 	= parent.userConfig;
		this.configLng 		= this.userConfig.languages;
		this.defaultLng 	= this.configLng.default;
		this.currentLng 	= this.defaultLng;
		this.availableLng 	= this.configLng.available;
		
		this.onLngReadyObj = new CustomEvent( _CONST.LNG.ready );
		
		this.switchLng();
		this.loadFile();
	};

	var proto = _construct.prototype;

	proto.switchLng = function()
	{
		this.setFromQueryUrl();
		if( this.isAvailableLng() === false )
		{
			this.currentLng = this.defaultLng;
		}
		//setTimeout( this.load.bind( this ) , 2000 );
	};

	proto.setFromQueryUrl = function()
	{
		this.currentLng = _UTILS.getUrlQueryByName( _CONST.LNG.urlKey )||this.defaultLng;
	};

	proto.isAvailableLng = function()
	{
		if( typeof( this.availableLng[ this.currentLng ] ) === "undefined" || this.availableLng[ this.currentLng ] === false )
		{
			return false;
		}

		return true;
	};

	proto.loadFile = function()
	{
		_UTILS.loadFile( "json" , this.configLng.dirPath+"/"+this.currentLng+this.configLng.format , this.lngReady.bind( this ) );
	};

	proto.lngReady = function( data )
	{
		this.data = data;
		this.onLngReadyObj.data = { "lng" : this.getLngByName.bind( this ) };
		window.dispatchEvent( this.onLngReadyObj );
	};

	proto.getLngByName = function( name )
	{
		if( this.data[ name ] !== "undefined" )
		{
			return this.data[ name ];
		}
		return name;
	};

	return _construct;
}();