var EmulateClickStat = function()
{
	var _construct = function ( parent , NS )
	{
		this.NS = NS;
		NS.noClickable = false;
		window.addEventListener( "mousemove" , this.mousemove.bind( this ) , true );
		window.addEventListener( "touchmove" , this.touchmove.bind( this ) , true );
		window.addEventListener( "touchend" , this.touchend.bind( this ) , false );
		window.checkTouchEnd = checkTouchEnd.bind( this );
	};

	var proto = _construct.prototype;

	var checkTouchEnd = function( elem )
	{
		var _onclick = "";

		if( this.NS.noClickable === false )
		{
			_onclick = elem.getAttribute("onclick");
			if( _onclick !== null )
			{
				new Function( _onclick ).bind( elem )();
				return false;
			}
		}
	};

	proto.mousemove = function( e )
	{
		this.NS.noClickable = true;
	};

	proto.touchmove = function( e )
	{
		this.NS.noClickable = true;
	};

	proto.touchend = function( e )
	{
		this.NS.noClickable = false;
	};

	proto.onClickMobile = function()
	{
		var reg = /"/gi;
		var evt = "";
		var act = "";

		return function( methodBody )
		{
			evt = "";
			act = methodBody.replace( reg ,'\\"' );
			act += ";return false";

			evt += " onclick=\""+act+"\" ";
			evt += " ontouchend=\"window.checkTouchEnd( this );return false\" ";
			return evt;
		}
	}();

	proto.setOnClickMobile = function()
	{
		var reg = /"/gi;
		var evt = "";

		return function( elem , methodBody )
		{
			evt = "";
			methodBody += ";return false";
			elem.setAttribute( "onclick" , methodBody );
			elem.setAttribute( "ontouchend" , "window.checkTouchEnd( this );return false" );
		}
	}();

	return _construct;
}();