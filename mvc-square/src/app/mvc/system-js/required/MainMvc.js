window.MainMvc = function()
{
	var _construct = function ( parent , rootElem , templateName )
	{
		this.parent 				= parent;
		mvc.mainMvc 				= this;
		this.rootElem 				= rootElem;
		this.templateName 			= templateName;
		this.userConfig 			= userConfig;
		this.language 				= new Language( this );
		this.routes = mvc.routes 	= mainRoutes;
		this.virtualUrl 			= null;
		this.tmplEngine 			= null;
		this.mvcController 			= null;
		this.mvcModels 				= null;

		_CONFIG = this._CONFIG 		= new Config( this );

		setDefaultPage();

		this.userAgent				= new UserAgent( this );

		mvc.userAgent 				= this.userAgent.userAgent;

		_CONFIG.setTemplates();

		window.addEventListener( _CONST.LNG.ready , lngReady.bind( this ) , true );
	};

	var proto = _construct.prototype;

	var lngReady = function( e )
	{
		mvc.lng = e.data.lng;
		this.tmplEngine 	= new Tmpl( this , _CONFIG.getTemplates() , this.tmplHelpers , init.bind( this ) );

		setTimeout( function()
		{
			this.virtualUrl		= new VirtualUrl( this , this.routes , this.tmplEngine );

		}.bind( this ), 0 )
	};

	var init = function( tmplStat )
	{
		if( tmplStat !== true )
		{
			return;
		}

		this.mvcModels = new Model( this , models );

		mvc.model = this.mvcModels;

		this.mvcController = new Controller( this , this.tmplEngine , this.rootElem , controllers , this.routes , this.templateName );
		this.tmplEngine.setMvcController( this.mvcController );
		this.mvcController.init();
	};

	var setDefaultPage = function()
	{
		var defaultPageName = mainRoutes.defaultPageName;
		delete mainRoutes.defaultPageName;

		if( window.location.hash === "" || window.location.hash === "#" )
		{
			window.location.hash = defaultPageName||"";
		}
	};

	return _construct;
}();