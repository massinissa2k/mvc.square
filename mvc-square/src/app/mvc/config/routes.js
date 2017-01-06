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
		}
	]
};