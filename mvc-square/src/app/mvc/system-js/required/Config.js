var Config = function()
{
	var _construct = function ( parent )
	{
		this.template = {};

		this.device =
		{
			getCurrentOs : "&os=android"
			,type : "other"
			,os : "other"
		};
	};

	var proto = _construct.prototype;

	var templateList = function()
	{
		return TEMPLATES_DATA;
	};

	proto.setTemplates = function()
	{
		var t = templateList();
		for( var J in t["all-devices"] )
		{
			if( t[this.device.type] && t[this.device.type][J] )
			{
				this.template[J] = t[this.device.type][J];
			}else
			{
				this.template[J] = t["all-devices"][J];
			}
		}
	};

	proto.getTemplates = function()
	{
		return this.template;
	};

	return _construct;
}();