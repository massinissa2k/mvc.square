controllers.Page = function()
{
	var _construct = function( parent , tmplEngine )
	{
		this.parent = parent;
		this.tmplEngine = tmplEngine;
	};

	var proto = _construct.prototype;

	proto.onCreate = function( domPositionElem , data , next )
	{
		data.pagesData = [{
			"hashName" : "slide0",
			"name" : "slide0",
			"isCurrent" : true,
			"slideName":"slide0-01",
			"pageChanger":null,
		},
		{
			"hashName" : "slide1",
			"name" : "slide1",
			"isCurrent" : false,
			"slideName":"slide1-01",
			"pageChanger":{
				"text": "ACCUEIL",
			},
		},
		{
			"hashName" : "slide2",
			"name" : "slide2",
			"isCurrent" : false,
			"slideName":"slide2-01",
			"pageChanger":{
				"text": "EDITO",
			},
		},
		{
			"hashName" : "slide3",
			"name" : "slide3",
			"isCurrent" : false,
			"slideName":"slide3-01",
			"pageChanger":{
				"text": "DÉFIS BDD…",
			},
		},
		{
			"hashName" : "slide4",
			"name" : "slide4",
			"isCurrent" : false,
			"slideName":"slide4-01",
			"pageChanger":{
				"text": "PARTICULIERS",
			},
		},
		{
			"hashName" : "slide5",
			"name" : "slide5",
			"isCurrent" : false,
			"slideName":"slide5-01",
			"pageChanger":{
				"text": "PROFESSIONNELS",
			},
		},
		{
			"hashName" : "slide6",
			"name" : "slide6",
			"isCurrent" : false,
			"slideName":"slide6-01",
			"pageChanger":{
				"text": "GESTION PRIVÉE",
			},
		},
		{
			"hashName" : "slide7",
			"name" : "slide7",
			"isCurrent" : false,
			"slideName":"slide7-01",
			"pageChanger":{
				"text": "MULTICANAL",
			},
		},
		{
			"hashName" : "slide8",
			"name" : "slide8",
			"isCurrent" : false,
			"slideName":"slide8-01",
			"pageChanger":{
				"text": "CHIFFRES",
			},
		}];

		data.parralaxConfigs = {
			"plan1":[
				{
					"attribute":"translatefrom",
					"value":"-35"
				},
				{
					"attribute":"translateto",
					"value":"35"
				},
				{
					"attribute":"class",
					"value":"layer layer1"
				}
			],
			"plan2":[
				{
					"attribute":"translatefrom",
					"value":"-15"
				},
				{
					"attribute":"translateto",
					"value":"15"
				},
				{
					"attribute":"class",
					"value":"layer layer2"
				}
			],
			"plan3":[
				{
					"attribute":"translatefrom",
					"value":"-5"
				},
				{
					"attribute":"translateto",
					"value":"5"
				},
				{
					"attribute":"class",
					"value":"layer layer3"
				}
			]
		};

		data.onclickConfigs = {
			"slide0-01":[],
			"slide1-01":[
				{
					"selector":"[data-name='bouton play ordinateur']",
					"function":function(e){
						this.parent.virtualUrl.switchUrl("movie/territoire_marque", "videos");
					}
				},
				{
					"selector":"[data-name='bouton texte PNB']",
					"function":function(e){
						$(document).find("[data-name=popupouverte-pnb]").addClass("opened");
					}
				},
				{
					"selector":"[data-name='popupferme-pnb']",
					"function":function(e){
						//find from the slide
						$(document).find("[data-name=popupouverte-pnb]").removeClass("opened");
					}
				},
			],
			"slide2-01":[
				{
					"selector":"[data-name='bouton play C2C']",
					"function":function(e){
						this.parent.virtualUrl.switchUrl("movie-frame/"+encodeURIComponent("http://video.caisse-epargne-loirecentre.fr/video/c2c?width=650&height=370&iframe=true"), "videos");
					}
				},
				{
					"selector":"[data-name='bouton play societaire']",
					"function":function(e){
						this.parent.virtualUrl.switchUrl("movie/film_societaire", "videos");
					}
				}
			],
			"slide3-01":[
				{
					"selector":"[data-name='bouton clic 1']",
					"function":function(e){
						window.open("mvc/assets/downloads/Destination_UC.pdf",'_blank');
					}
				},
				{
					"selector":"[data-name='bouton clic 2']",
					"function":function(e){
						window.open("mvc/assets/downloads/tableau_2.pdf",'_blank');
					}
				},
				{
					"selector":"[data-name='bouton play video']",
					"function":function(e){
						this.parent.virtualUrl.switchUrl("movie-ext/YVYYRWFFoFM", "videos");
					}
				},
			],
			"slide4-01":[{
					"selector":"[data-name='bouton ipad 2']",
					"function":function(e){
						this.parent.virtualUrl.switchUrl("movie/monexpert", "videos");
					}
				},
				{
					"selector":"[data-name='bouton tv']",
					"function":function(e){
						this.parent.virtualUrl.switchUrl("movie/tv", "videos");
					}
				},
				{
					"selector":"[data-name='bouton clic 1']",
					"function":function(e){
						window.open("http://blog.horizonentrepreneurs.fr/guides_et_conseils/pour-financer/",'_blank');
					}
				},
			],
			"slide5-01":[{
					"selector":"[data-name='bouton play 1']",
					"function":function(e){
						this.parent.virtualUrl.switchUrl("movie-ext/Svk3N2wVylc", "videos");
					}
				},
				{
					"selector":"[data-name='bouton play 2']",
					"function":function(e){
						this.parent.virtualUrl.switchUrl("movie-ext/M8pTaXqaItk", "videos");
					}
				},
				{
					"selector":"[data-name='bouton clic']",
					"function":function(e){
						window.open("mvc/assets/downloads/gestion_privee.pdf",'_blank');
					}
				},
			],
			"slide6-01":[
			{
				"selector":"[data-name='bouton tv 2']",
				"function":function(e){
					this.parent.virtualUrl.switchUrl("movie-ext/AUM5oyw31aI", "videos");
				}
			},
			{
				"selector":"[data-name='bouton clic']",
				"function":function(e){
					window.open("mvc/assets/downloads/charte_joignabilite.pdf",'_blank');
				}
			},
			{
				"selector":"[data-name='bouton clic ordi']",
				"function":function(e){
					window.open("mvc/assets/downloads/gestion_privee.pdf",'_blank');
				}
			},
			],
			"slide7-01":[
				{
					"selector":"[data-name='bouton clic 1']",
					"function":function(e){
						//find from the slide
						$(document).find("[data-name=popupouverte-conquete]").addClass("opened");
					}
				},
				{
					"selector":"[data-name='popupferme-conquete']",
					"function":function(e){
						//find from the slide
						$(document).find("[data-name=popupouverte-conquete]").removeClass("opened");
					}
				},
				{
					"selector":"[data-name='bouton clic 2']",
					"function":function(e){
						//find from the slide
						$(document).find("[data-name=popupouverte-collecte]").addClass("opened");
					}
				},
				{
					"selector":"[data-name='popupferme-collecte']",
					"function":function(e){
						//find from the slide
						$(document).find("[data-name=popupouverte-collecte]").removeClass("opened");
					}
				},
				{
					"selector":"[data-name='bouton clic 3']",
					"function":function(e){
						//find from the slide
						$(document).find("[data-name=popupouverte-equipement]").addClass("opened");
					}
				},
				{
					"selector":"[data-name='popupferme-equipement']",
					"function":function(e){
						//find from the slide
						$(document).find("[data-name=popupouverte-equipement]").removeClass("opened");
					}
				},
			],
			"slide8-01":[
				{
					"selector":"[data-name='bouton apple pay']",
					"function":function(e){
						this.parent.virtualUrl.switchUrl("movie/apple_pay", "videos");
					}
				},
				{
					"selector":"[data-name='bouton ipad3']",
					"function":function(e){
						this.parent.virtualUrl.switchUrl("movie/e-COMMERCE", "videos");
					}
				},
				{
					"selector":"[data-name='bouton play ipad2']",
					"function":function(e){
						this.parent.virtualUrl.switchUrl("movie/livret_A", "videos");
					}
				},
				{
					"selector":"[data-name='link-site1']",
					"function":function(e){
						window.open("http://www.monbanquierenligne.fr",'_blank');
					}
				},
				{
				"selector":"[data-name='link-site2']",
				"function":function(e){
					window.open("http://www.izirelance.fr",'_blank');}
				},
				{
				"selector":"[data-name='link-site3']",
				"function":function(e){
					window.open("http://www.horizonentrepreneurs.fr",'_blank');}
				},
				{
				"selector":"[data-name='link-site4']",
				"function":function(e){
					window.open("https://www.livrets-a-connecter.fr/",'_blank');}
				},
				{
				"selector":"[data-name='link-site5']",
				"function":function(e){
					window.open("http://www.caisse-epargne.fr",'_blank');}
				},
				{
				"selector":"[data-name='link-site6']",
				"function":function(e){
					window.open("http://www.gestionprivee.caisse-epargne.fr",'_blank');}
				},
				{
				"selector":"[data-name='sharefacebook']",
				"function":function(e){
					window.open("https://fr-fr.facebook.com/caisse.epargne.loire.centre/",'_blank');}
				},
				{
				"selector":"[data-name='sharetwitter']",
				"function":function(e){
					window.open("https://twitter.com/ce_loirecentre",'_blank');}
				},
				{
				"selector":"[data-name='shareyoutube']",
				"function":function(e){
					window.open("https://www.youtube.com/user/45ecureuil/videos",'_blank');}
				},
				{
				"selector":"[data-name='sharewebsite']",
				"function":function(e){
					window.open("https://www.caisse-epargne-loirecentre.fr/",'_blank');}
				},
			],
		};

		data.sharedData = {
			epublisherSlider : null
		};

	};

	return _construct;
}();