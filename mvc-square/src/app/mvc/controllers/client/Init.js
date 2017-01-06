controllers.Init = function()
{
	var _construct = function( parent , tmplEngine )
	{
		this.parent = parent;
		this.tmplEngine = tmplEngine;
	};

	var proto = _construct.prototype;
	
	proto.onShow = function( tmpl , htmlElement , data , next )
	{
		this.parent.virtualUrl.switchUrl( "home" , 'pages' );
		
		return false;
	};

	
	return _construct;
}();