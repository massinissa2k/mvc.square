var mainRoutes = 
{
	defaultPageName : "Page"
	,pages : 
	[
		{
			onGet 			: [ "" ]
			,controller 	: "Page"
			,template 		: "client/page"
		}
		,{
			onGet 			: [ "page" ]
			,controller 	: "Page"
			,template 		: "client/page"
		},{
			onGet 			: [ "page2" ]
			,controller 	: "Page2"
			,template 		: "client/page2"
		}
	]
};