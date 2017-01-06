controllers.MainView = function()
{
	var _construct = function( parent , tmplEngine , route )
	{
		this.parent = parent;
		this.tmplEngine = tmplEngine;
	};

	var proto = _construct.prototype;
	return _construct;
}();