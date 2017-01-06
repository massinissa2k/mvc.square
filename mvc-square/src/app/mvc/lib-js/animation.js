var AnimationManager = function() {
	"use strict";
	var _construct = function(parent) {
		this.parent = parent;
		//addevent pagechange e
		console.log("construct animationManager");
		window.addEventListener("eventSliderReady", this.eventSliderReady.bind(this));
		window.addEventListener("pageChangeEpublisher_slider", this.onPageChange.bind(this));

		this.lastElem = null;
		this.currentElemJq = null;
		this.currentElem = null;
		this.scenesList = null;

		this.currentIndex = null;

		this.scenesList = this.getScenesData();

		this.timelineHover = null;
	};

	var proto = _construct.prototype;

	proto.eventSliderReady = function(e) {
		this.event = e;

		setTimeout(this.initButtons.bind(this), 0);
		this.onPageChange(e);
	};

	proto.initButtons = function() {
		var buttonElems = this.event.data._ctx.basicElement.find("[data-name*=bouton]");
		var _self = this;

		buttonElems.on("mouseenter", function(e) {
			_self.timelineHover = new TimelineMax();

			_self.timelineHover.to(this, 2, {
				scaleY: "1.2",
				scaleX: "1.2",
				ease: Elastic.easeOut,
				transformOrigin: "50% 50%"
			}, 0);
		});

		buttonElems.on("mouseleave", function(e) {
			_self.timelineHover = new TimelineMax();

			_self.timelineHover.to(this, 2, {
				scaleY: "1",
				scaleX: "1",
				ease: Elastic.easeOut,
				transformOrigin: "50% 50%"
			}, 0);
		});

	}
	proto.onPageChange = function() {
		var title = null;
		return function(e) {
			if (e.data._ctx.currentIndex != this.currentIndex) {
				this.currentIndex = e.data._ctx.currentIndex;
			} else {
				return;
			}
			this.currentElemJq = e.data.datas.elem;
			this.currentElem = this.currentElemJq[0];

			if (typeof(this.currentElem.animationSvg) === "undefined") {
				title = this.currentElem.getAttribute('titre');
				//console.log(title);
				if (title !== null && typeof(this.scenesList[title]) === "function") {
					this.currentElem.animationSvg = this.scenesList[title](this.currentElemJq);
				}
			}

			if (this.lastElem !== null && this.lastElem.animationSvg !== null) {
				this.animScenesAction(this.lastElem.animationSvg, "pause");
			}

			if (this.currentElem.animationSvg !== null) {
				this.animScenesAction(this.currentElem.animationSvg, "restart");
			}

			this.lastElem = this.currentElem;
		}
	}();

	proto.animScenesAction = function() {
		var i = 0;
		var L = 0;
		return function(arrAnims, action) {
			if (arrAnims !== undefined) {
				i = 0;
				L = arrAnims.length;

				for (; i < L; i++) {

					if (arrAnims[i] === null) {
						continue;
					}
					arrAnims[i][action]();
				}

			}
		}
	}();

	proto.getScenesData = function() {
		var _self = this;

		var allSlideElems = null;
		var titreElem = null;

		var tweenPath = null;
		var tweenFadeFromLeft = null;
		var tweenFadeFromRight = null;
		var tweenFadeFromTop = null;
		var tweenFadeFromBottom = null;
		var tweenElasticScale = null;
		var tweenClignement = null;
		var tweenDodeline = null;
		var tweenFleche = null;
		var tweenPlantes = null;
		var tweenPlantes_ = null;
		var tweenElemsAppear = null;
		var tweenElemsAppear_ = null;
		var tweenDisappear = null;

		var slide0AnimPc = null;
		var tweenInstantMove = null;

		var timelineArr = new Array(4);
		var timelineContinous = null; //ex:plantes

		tweenPath = function(timeline, elements, delay, start, end) {
			start = start || "102%";
			end = end || "0%";

			timeline.fromTo(elements,
				2, {
					drawSVG: start
				}, {
					drawSVG: end
				},
				delay);

			return timeline;
		};

		tweenFadeFromLeft = function(timeline, elements, delay) {
			timeline.fromTo(elements,
				0.4, {
					x: -50,
					opacity: 0,
					ease: Power1.easeOut,
					transformOrigin: "0% 0%"
				}, {
					x: 0,
					opacity: 1
				},
				delay
			);

			return timeline;
		};

		tweenFadeFromRight = function(timeline, elements, delay) {
			timeline.fromTo(elements,
				0.4, {
					x: 50,
					opacity: 0,
					ease: Power1.easeOut,
					transformOrigin: "0% 0%"
				}, {
					x: 0,
					opacity: 1
				},
				delay
			);

			return timeline;
		};

		tweenFadeFromTop = function(timeline, elements, delay) {
			timeline.fromTo(elements,
				0.4, {
					y: -50,
					opacity: 0,
					ease: Power1.easeOut,
					transformOrigin: "0% 0%"
				}, {
					y: 0,
					opacity: 1
				},
				delay
			);

			return timeline;
		};

		tweenFadeFromBottom = function(timeline, elements, delay) {
			timeline.fromTo(elements,
				0.4, {
					y: 50,
					opacity: 0,
					ease: Power1.easeOut,
					transformOrigin: "0% 0%"
				}, {
					y: 0,
					opacity: 1
				},
				delay
			);

			return timeline;
		};

		tweenElasticScale = function(timeline, elements, delay, scaleRatio) {
			scaleRatio = scaleRatio || "1.2";

			timeline.fromTo(elements,
				0.5, {
					scaleY: "1",
					scaleX: "1",
					ease: Elastic.easeNone,
					transformOrigin: "50% 50%"
				}, {
					scaleY: scaleRatio,
					scaleX: scaleRatio,
					yoyo: true,
					repeat: 1
				},
				delay
			);

			return timeline;
		}

		tweenClignement = function(timeline, elements, delay) {
			timeline.fromTo(elements, 0.2, {
				scaleY: "1",
				transformOrigin: "50% 50%"
			}, {
				delay: 0.4,
				scaleY: "0.1",
				yoyo: true,
				repeat: 1
			}, delay);

			return timeline;
		}

		tweenDodeline = function(timeline, elements, delay) {
			timeline.fromTo(elements, 0.4, {
				rotation: "0",
				transformOrigin: "50% 80%",
				ease: Power1.easeInOut
			}, {
				rotation: "4",
				repeat: 1,
				yoyo: true
			}, delay);

			return timeline;
		};

		tweenFleche = function(timeline, elements, delay, x, y) {
			timeline.fromTo(elements, 0.4, {
				x: 0,
				y: 0,
				ease: Elastic.easeOut
			}, {
				x: x,
				y: y,
				repeat: 1,
				yoyo: true
			}, delay);

			return timeline;
		};

		tweenPlantes_ = function(timeline, elements, coef) {
			timeline.fromTo(elements, 4, {
				rotation: "0",
				transformOrigin: "50% 80%"
			}, {
				rotation: "-" + coef,
				ease: Back.easeInOut.config(Math.floor((Math.random() * 400) + 100) / 100),
				repeat: -1,
				yoyo: true
			}, "0");

			return timeline;
		};

		tweenPlantes = function(timeline, elements, coef) {
			elements = elements.children();
			var L = elements.length;
			for (var i = 0; i < L; i++) {
				timeline = tweenPlantes_(timeline, elements[i], 2);
			}

			return timeline;
		};

		tweenElemsAppear_ = function(timeline, elements, delay) {
			timeline.fromTo(elements, 0.5, {
				opacity: "0"
			}, {
				opacity: "1"
			}, delay);

			return timeline;
		};

		tweenElemsAppear = function(timeline, elements, delay, name) {

			elements = elements.children();
			var L = elements.length;
			var _delay = delay;
			for (var i = 0; i < L; i++) {
				timeline = tweenElemsAppear_(timeline, elements.filter("[data-name='" + name + (i + 1) + "']"), _delay);
				_delay = "+=0";
			}

			return timeline;
		};

		tweenDisappear = function(timeline, elements, delay) {

			timeline.fromTo(elements, 0.5, {
				opacity: "1"
			}, {
				opacity: "0"
			}, delay);

			return timeline;
		};

		tweenInstantMove = function(timeline, elements, delay, unit) {

			timeline.fromTo(elements, 0.01, {
				x: unit
			}, {
				x: unit
			}, delay);

			return timeline;
		};

		slide0AnimPc = function(timeline, elements, delay, ease) {
			var cursor = elements.find("[data-name=curseur]");
			timeline.fromTo(cursor,
				1, {
					x: -150,
					y: 20,
					ease: ease||Power1.easeOut,
					transformOrigin: "0% 0%"
				}, {
					x: 0,
					y: 0
				},
				delay
			);
			var click = elements.find("[data-name=clic]");
			timeline.fromTo(click,
				0.01, {
					opacity: 0
				}, {
					opacity: 1
				},
				"+=0"
			);
			timeline.fromTo(click,
				0.05, {
					scaleX: 0.8,
					scaleY: 0.8,
					ease: Power1.easeOut,
					transformOrigin: "50% 50%"
				}, {
					scaleX: 1,
					scaleY: 1,
					repeat: 1,
					yoyo: true
				},
				"+=0"
			);
			/*timeline.to(click,
				0.01,
				{opacity:0},
				"+=0"
			);*/

			return timeline;
		};

		var scenes = {
			"slide0": function(svgElem) {
				var timelineArr = [];

				var find = [
					"[data-name='bulle rdv']",
					"[data-name='bulle @']",
					"[data-name='souris']",
					"[data-name=rayon]",
					"[data-name='titre gauche']",
					"[data-name='titre path']",
					"[data-name='titre droite']",
					"[data-name='wifi barres']",
					"[data-name='message points']",
					"[data-name=test]",
				].join(",");

				allSlideElems = svgElem.find(find);

				timelineArr[0] = new TimelineMax();
				//slide0AnimPc(timelineArr[0], allSlideElems.filter("[data-name=souris]"), "0.5");
				tweenFadeFromLeft(timelineArr[0], allSlideElems.filter("[data-name='titre gauche']"), "+=0.2");
				tweenPath(timelineArr[0], allSlideElems.filter("[data-name='titre path']"), "+=0", "0% 102%", "102% 102%");
				tweenFadeFromRight(timelineArr[0], allSlideElems.filter("[data-name='titre droite']"), "+=0");
				timelineArr[0].repeat(0);

				timelineArr[1] = new TimelineMax(); //bulle rdv + bulle @
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bulle rdv']"), "+=0", "1.1");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bulle @']"), "+=1", "1.1");
				timelineArr[1].delay(0).repeatDelay(0).repeat(-1);

				timelineArr[2] = new TimelineMax() //wifi + phone message
				tweenElemsAppear(timelineArr[2], allSlideElems.filter("[data-name='message points']"), "+=0.5", "point");
				tweenElemsAppear(timelineArr[2], allSlideElems.filter("[data-name='wifi barres']"), "+=0", "barre");

				tweenDisappear(timelineArr[2], allSlideElems.filter("[data-name='message points']"), "+=1.5");
				tweenDisappear(timelineArr[2], allSlideElems.filter("[data-name='wifi barres']"), "-=0.5");
				timelineArr[2].delay(0).repeatDelay(0).repeat(-1);

				timelineArr[3] = new TimelineMax({yoyo:true,repeat:-1});
				timelineArr[3].fromTo(allSlideElems.filter("[data-name=rayon]"), 0.6, {
					scaleY: "0.95",
					scaleX: "0.95",
					transformOrigin: "10 10%"
				}, {
					scaleY: "1.05",
					scaleX: "1.05",
					ease: Power1.easeInOut
				});

				timelineArr[4] = new TimelineMax({yoyo:true,repeat:-1,repeatDelay:2});
				slide0AnimPc(timelineArr[4], allSlideElems.filter("[data-name=souris]"), "0.8",Expo.easeInOut);

				return timelineArr;
			},
			"slide1": function(svgElem) {
				var timelineArr = [];
				var find = [
					"[data-name=Edito-text]",
					"[data-name=Edito-path]",
					"[data-name=yeux]",
					"[data-name*=bouton]",
					"[data-name=feuilles]",
					"[data-name='bras droite']",
					"[data-name='conclusion']",
					"[data-name=tete]"
				].join(",");

				var allSlideElems = svgElem.find(find);

				timelineArr[0] = new TimelineMax(); //Title
				tweenPath(timelineArr[0], allSlideElems.filter("[data-name=Edito-path]"), "0.5");
				tweenFadeFromRight(timelineArr[0], allSlideElems.filter("[data-name=Edito-text]"), "+=0");
				timelineArr[0].fromTo(allSlideElems.filter("[data-name=conclusion]"), 0.5, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut,
				}, "+=0.3");
				timelineArr[0].repeat(0);

				timelineArr[1] = new TimelineMax(); //Clignement yeux + scale des boutons + tete
				tweenClignement(timelineArr[1], allSlideElems.filter("[data-name=yeux]"), "0");
				tweenDodeline(timelineArr[1], allSlideElems.filter("[data-name='tete']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton texte PNB']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton play ordinateur']"), "+=1");
				timelineArr[1].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[2] = new TimelineMax();
				tweenPlantes(timelineArr[2], allSlideElems.filter("[data-name=feuilles]"), 2);
				
				timelineArr[3] = new TimelineMax({repeat:-1,yoyo:true,repeatDelay:1.5});
				timelineArr[3].fromTo(allSlideElems.filter("[data-name='bras droite']"), 1, {
					y: "0",
					x: "0",
					rotation: "0",
					transformOrigin: "-20% 60%"
				}, {
					y: "-6",
					x: "-2.5",
					rotation: "-5",
					ease: Power1.easeInOut
				}, "+=0.5");

				return timelineArr;
			},
			"slide2": function(svgElem) {
				var timelineArr = [];
				var find = [
					"[data-name=yeux]",
					"[data-name*=bouton]",
					"[data-name=feuilles]",
					"[data-name='bulle intro rouge']",
					"[data-name='texte rouge']",
					"[data-name='texte bleu']",
					"[data-name='conclusion bloc rouge']",
					"[data-name=titre]",
					"[data-name*=fleche]",
					"[data-name=tete]"
				].join(",");

				var allSlideElems = svgElem.find(find);
				titreElem = allSlideElems.filter("[data-name='titre']");

				timelineArr[0] = new TimelineMax(); //titre
				tweenFadeFromTop(timelineArr[0], titreElem.find("[data-name='titre haut']"), "0.5");
				tweenPath(timelineArr[0], titreElem.find("[data-name='titre path'] path"), "+=0", "0% 102%", "96% 102%");
				tweenFadeFromBottom(timelineArr[0], titreElem.find("[data-name='titre bas']"), "+=0");
				timelineArr[0].fromTo(allSlideElems.filter("[data-name='bulle intro rouge']"), 0.5, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut,
				}, "+=0.1");

				timelineArr[0].fromTo(allSlideElems.filter("[data-name='fleche1']"), 0.5, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut,
				}, "+=0.1");

				timelineArr[0].fromTo(allSlideElems.filter("[data-name='texte rouge']"), 0.5, {
					y: "-50",
					opacity: 0
				}, {
					y: "0",
					opacity: 1,
					ease: Power1.easeInOut,
				}, "+=0.1");

				timelineArr[0].fromTo(allSlideElems.filter("[data-name='texte bleu']"), 0.5, {
					y: "-50",
					opacity: 0
				}, {
					y: "0",
					opacity: 1,
					ease: Power1.easeInOut,
				}, "+=0.1");


				timelineArr[0].fromTo(allSlideElems.filter("[data-name='conclusion bloc rouge']"), 0.5, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut,
				}, "+=0.1");


				timelineArr[0].repeat(0);

				timelineArr[1] = new TimelineMax(); //Clignement yeux + scale des boutons + tete
				tweenClignement(timelineArr[1], allSlideElems.filter("[data-name=yeux]"), "0");
				tweenDodeline(timelineArr[1], allSlideElems.filter("[data-name='tete']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton play C2C']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton play societaire']"), "+=1");
				timelineArr[1].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[2] = new TimelineMax(); //fleches
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche1']"), "+=0", 5, -2);
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche4']"), "+=0", -3, 4);
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche3']"), "+=0", 3, 4);
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche2']"), "+=0", 5, 2);
				timelineArr[2].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[3] = new TimelineMax(); //plante
				tweenPlantes(timelineArr[3], allSlideElems.filter("[data-name=feuilles]"), 2);

				return timelineArr;
			},
			"slide3": function(svgElem) {
				var timelineArr = [];
				var find = [
					"[data-name=yeux]",
					"[data-name='bulle rouge conclusion']",
					"[data-name=ipad-animation-graph]",
					"[data-name=pied-gauche]",
					"[data-name=bras-gauche-ipad]:first",
					"[data-name*=bouton]",
					"[data-name=feuilles]",
					"[data-name=titre]",
					"[data-name='paragraphes textes']",
					"[data-name=tete]"
				].join(",");

				var allSlideElems = svgElem.find(find);
				titreElem = allSlideElems.filter("[data-name='titre']");

				timelineArr[0] = new TimelineMax(); //paragraphes + titre
				tweenFadeFromLeft(timelineArr[0], allSlideElems.find("[data-name='titre gauche']"), "0.5");
				tweenPath(timelineArr[0], allSlideElems.find("[data-name='titre path'] path"), "+=0", "0% 102%", "102% 102%");
				tweenFadeFromRight(timelineArr[0], allSlideElems.find("[data-name='titre droite']"), "+=0");
				timelineArr[0].repeat(0);

				timelineArr[1] = new TimelineMax(); //Clignement yeux + scale des boutons + tete
				tweenClignement(timelineArr[1], allSlideElems.filter("[data-name=yeux]"), "0");
				tweenDodeline(timelineArr[1], allSlideElems.filter("[data-name='tete']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton clic 1']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton clic 2']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton play association']"), "+=1");
				timelineArr[1].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[2] = new TimelineMax(); //plante
				tweenPlantes(timelineArr[2], allSlideElems.filter("[data-name=feuilles]"), 2);

				timelineArr[3] = new TimelineMax({
					repeat: -1,
					repeatDelay: 4
				});
				timelineArr[3].fromTo(allSlideElems.filter("[data-name=bras-gauche-ipad]"), 1.5, {
					rotation: "0",
					transformOrigin: "0 100"
				}, {
					rotation: "20",
					ease: Power1.easeInOut,
					repeat: 1,
					yoyo: true
				}, "2");

				timelineArr[3].fromTo(allSlideElems.filter("[data-name=pied-gauche]"), 0.5, {
					rotation: "0",
					transformOrigin: "0 0"
				}, {
					rotation: "-10",
					ease: Power1.easeInOut,
					repeat: 3,
					yoyo: true
				}, "2");

				var graphs = allSlideElems.filter("[data-name='ipad-animation-graph']").find("polygon");
				timelineArr[4] = new TimelineMax({
					repeat: -1,
					repeatDelay: 2
				});
				timelineArr[4].fromTo(graphs, 2, {
					scaleY: "0",
					transformOrigin: "0 100%"
				}, {
					scaleY: "1",
					ease: Power1.easeInOut
				});

				timelineArr[4].to(graphs, 2, {
					scaleY: "0"
				}, "+=5");

				timelineArr[5] = new TimelineMax({
					repeat: 0
				});
				var txts = allSlideElems.filter("[data-name='paragraphes textes']").find("[data-name*=texte]");

				var ar = txts.toArray();
				var L = ar.length;
				while (L--) {
					timelineArr[5].fromTo(ar[L], 0.5, {
						x: "-50",
						opacity: 0
					}, {
						x: "0",
						opacity: 1,
						ease: Power1.easeInOut,
					}, "+=0.3");
				}

				timelineArr[5].fromTo(allSlideElems.filter("[data-name='bulle rouge conclusion']"), 0.5, {
					y: "10",
					opacity: 0
				}, {
					y: "0",
					opacity: 1,
					ease: Power1.easeInOut,
				}, "+=0.3");


				return timelineArr;
			},
			"slide4": function(svgElem) {
				var timelineArr = [];
				var find = [
					"[data-name=spots]",
					"[data-name='bras gauche'] [data-name=main]",
					"[data-name=banniere]",
					"[data-name=yeux]",
					"[data-name*=bouton]",
					"[data-name=feuilles]",
					"[data-name=feuilles2]",
					"[data-name=titre]",
					"[data-name*=fleche]",
					"[data-name=tete]"
				].join(",");

				var allSlideElems = svgElem.find(find);
				titreElem = allSlideElems.filter("[data-name='titre']");

				timelineArr[0] = new TimelineMax(); //titre
				tweenFadeFromLeft(timelineArr[0], titreElem.find("[data-name='titre gauche']"), "0.5");
				tweenFadeFromBottom(timelineArr[0], titreElem.find("[data-name='titre bas']"), "+=0");
				timelineArr[0].repeat(0);

				timelineArr[1] = new TimelineMax(); //Clignement yeux + scale des boutons + tete
				tweenClignement(timelineArr[1], allSlideElems.filter("[data-name=yeux]"), "0");
				tweenDodeline(timelineArr[1], allSlideElems.filter("[data-name='tete']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton clic 1']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton ipad 2']"), "+=1");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton tv']"), "+=0.5");
				timelineArr[1].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[2] = new TimelineMax(); //fleches
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche1']"), "+=0.5", 6, -1);
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche3']"), "+=0.5", 3, 4);
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche2']"), "+=0.5", 5, 2);
				timelineArr[2].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[3] = new TimelineMax(); //plante
				tweenPlantes(timelineArr[3], allSlideElems.filter("[data-name=feuilles]"), 2);
				tweenPlantes(timelineArr[3], allSlideElems.filter("[data-name=feuilles2]"), 2);


				timelineArr[4] = new TimelineMax({
					repeat: -1,
					yoyo: true
				});
				var spots = allSlideElems.filter("[data-name=spots]").find("[data-name*=spot]");
				var ar = spots.toArray();
				var L = ar.length;
				while (L--) {
					timelineArr[4].fromTo(ar[L], 1, {
						rotation: "-" + (5 + Math.random() * 5),
						transformOrigin: "50% 0"
					}, {
						rotation: (5 + Math.random() * 5),
						ease: Power1.easeInOut
					}, "-=1");
				}

				timelineArr[5] = new TimelineMax({});

				timelineArr[5].fromTo(allSlideElems.filter("[data-name='bras gauche'] [data-name=main]"), 0.5, {
					rotation: "-10",
					transformOrigin: "0 50%"
				}, {
					rotation: "0",
					ease: Power1.easeInOut,
				}, "+=2");

				var elems = allSlideElems.filter("[data-name=banniere]").children();
				ar = elems.toArray();
				L = ar.length;
				while (L--) {
					timelineArr[5].fromTo(ar[L], 0.4, {
						x: "-50",
						opacity: 0
					}, {
						x: "0",
						opacity: 1,
						ease: Power1.easeInOut,
					}, "+=0");
				}

				return timelineArr;
			},
			"slide5": function(svgElem) {
				var find = [
					"[data-name=yeux]",
					"[data-name=paragraphes]",
					"[data-name*=bouton]",
					"[data-name=feuilles]",
					"[data-name=titre]",
					"[data-name=tete]"
				].join(",");

				var timelineArr = [];
				var allSlideElems = svgElem.find(find);
				var titreElem = allSlideElems.filter("[data-name='titre']");

				timelineArr[0] = new TimelineMax(); //titre
				tweenInstantMove(timelineArr[0], allSlideElems.filter("[data-name=feuilles]"), "0", 100);
				tweenFadeFromTop(timelineArr[0], titreElem.find("[data-name='titre haut']"), "0.5");
				tweenFadeFromLeft(timelineArr[0], titreElem.find("[data-name='titre gauche']"), "+=0.5");
				tweenFadeFromRight(timelineArr[0], titreElem.find("[data-name='titre droite']"), "+=0.5");
				tweenFadeFromBottom(timelineArr[0], titreElem.find("[data-name='titre bas']"), "+=0");
				timelineArr[0].repeat(0);

				timelineArr[1] = new TimelineMax(); //Clignement yeux + scale des boutons + tete
				tweenClignement(timelineArr[1], allSlideElems.filter("[data-name=yeux]"), "0");
				tweenDodeline(timelineArr[1], allSlideElems.filter("[data-name='tete']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton play 1']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton play 2']"), "+=1");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton clic']"), "+=0.5");
				timelineArr[1].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[2] = new TimelineMax(); //plante
				tweenPlantes(timelineArr[2], allSlideElems.filter("[data-name=feuilles]"), 2);

				var paragraphes = allSlideElems.filter("[data-name=paragraphes]");
				paragraphes = paragraphes.find([
					"[data-name=intro]",
					"[data-name=1]",
					"[data-name=2]",
					"[data-name=3]",
					"[data-name='filet-path-1'] path",
					"[data-name='filet-path-2'] path",
					"[data-name='filet-path-3'] path"
				].join(","));
				timelineArr[3] = new TimelineMax();

				timelineArr[3].fromTo(paragraphes.filter("[data-name=intro]"), 0.5, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=1.5");

				tweenPath(timelineArr[3], paragraphes.filter("[data-name='filet-path-1'] path"), "+=0", "0% 102%", "0% 0%");

				timelineArr[3].fromTo(paragraphes.filter("[data-name=1]"), 0.5, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "-=0.5");

				tweenPath(timelineArr[3], paragraphes.filter("[data-name='filet-path-2'] path"), "+=0", "0% 102%", "102% 102%");

				timelineArr[3].fromTo(paragraphes.filter("[data-name=2]"), 0.5, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "-=0.5");

				tweenPath(timelineArr[3], paragraphes.filter("[data-name='filet-path-3'] path"), "+=0", "0% 102%", "102% 102%");

				timelineArr[3].fromTo(paragraphes.filter("[data-name=3]"), 0.5, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "-=0.5");

				return timelineArr;
			},
			"slide6": function(svgElem) {
				var timelineArr = [];
				var find = [
					"[data-name*=bouton]",
					"[data-name=titre]",
					"[data-name=feuilles]",
					"[data-name*=tete]",
					"[data-name=wifi]",
					"[data-name='nom avatar']",
					"[data-name*=texte]"
				].join(",");
				var allSlideElems = svgElem.find(find);

				var titreElem = allSlideElems.filter("[data-name='titre']");
				timelineArr[0] = new TimelineMax();
				tweenFadeFromLeft(timelineArr[0], allSlideElems.find("[data-name='titre gauche']"), "0.5");
				tweenPath(timelineArr[0], allSlideElems.find("[data-name='titre path'] path"), "+=0", "0% 102%", "102% 102%");
				tweenFadeFromRight(timelineArr[0], allSlideElems.find("[data-name='titre droite']"), "+=0");

				timelineArr[1] = new TimelineMax(); //Clignement yeux + scale des boutons + tete
				tweenClignement(timelineArr[1], allSlideElems.filter("[data-name=yeux1]"), "0");
				tweenDodeline(timelineArr[1], allSlideElems.filter("[data-name='tete2']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton clic ordi']"), "+=0.5");
				tweenDodeline(timelineArr[1], allSlideElems.filter("[data-name='tete1']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton clic']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton tv 2']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='wifi']"), "+=0.5");
				tweenClignement(timelineArr[1], allSlideElems.filter("[data-name=yeux2]"), "+=0.5");
				timelineArr[1].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[2] = new TimelineMax(); //plante
				tweenPlantes(timelineArr[2], allSlideElems.filter("[data-name=feuilles]"), 2);

				timelineArr[3] = new TimelineMax();
				timelineArr[3].fromTo(allSlideElems.filter("[data-name='texte 0']"), 0.8, {
					y: "-50",
					opacity: 0
				}, {
					y: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=2.5");

				timelineArr[3].fromTo(allSlideElems.filter("[data-name='texte 1']"), 0.8, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=0");

				timelineArr[3].fromTo(allSlideElems.filter("[data-name='texte 2']"), 0.8, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=0");

				timelineArr[3].fromTo(allSlideElems.filter("[data-name='nom avatar']"), 0.8, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=0");
				return timelineArr;
			},
			"slide7": function(svgElem) {

				var timelineArr = [];
				var find = [
					"[data-name=yeux]",
					"[data-name*=bouton]",
					"[data-name=feuilles]",
					"[data-name=feuilles2]",
					"[data-name=titre]",
					"[data-name*=fleche]",
					"[data-name=tete]",
					"[data-name='bras gauche']",
					"[data-name='CHIFFRES PART']",
					"[data-name='CHIFFRES MARCHE PRO']",
					"[data-name='CHIFFRE PATRIMONIAL']"
				].join(",");
				var allSlideElems = svgElem.find(find);

				var titreElem = allSlideElems.filter("[data-name='titre']");

				var numbersGroup = [];
				numbersGroup.push(allSlideElems.filter("[data-name='CHIFFRES PART']").find("[data-name='anim-number-g']>text"));
				numbersGroup.push(allSlideElems.filter("[data-name='CHIFFRES MARCHE PRO']").find("[data-name='anim-number-g']>text"));
				numbersGroup.push(allSlideElems.filter("[data-name='CHIFFRE PATRIMONIAL']").find("[data-name='anim-number-g']>text"));

				timelineArr[0] = new TimelineMax(); //titre
				tweenInstantMove(timelineArr[0], allSlideElems.filter("[data-name=feuilles]"), "0", -100);
				tweenFadeFromLeft(timelineArr[0], titreElem.find("[data-name='titre gauche']"), "0.5");
				tweenFadeFromRight(timelineArr[0], titreElem.find("[data-name='titre droite']"), "+=0");
				timelineArr[0].repeat(0);

				timelineArr[1] = new TimelineMax(); //Clignement yeux + scale des boutons + tete
				tweenClignement(timelineArr[1], allSlideElems.filter("[data-name=yeux]"), "0");
				tweenDodeline(timelineArr[1], allSlideElems.filter("[data-name='tete']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton clic 1']"), "+=0.5");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton clic 2']"), "+=1");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton clic 3']"), "+=0.5");
				timelineArr[1].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[2] = new TimelineMax(); //fleches
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche1']"), "+=0.5", 2, 5);
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche3']"), "+=0.5", 2, 5);
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche2']"), "+=0.5", 2, 5);
				timelineArr[2].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[3] = new TimelineMax(); //plante
				tweenPlantes(timelineArr[3], allSlideElems.filter("[data-name=feuilles]"), 2);
				tweenPlantes(timelineArr[3], allSlideElems.filter("[data-name=feuilles2]"), 2);

				timelineArr[4] = new TimelineMax();
				var anim = null;

				for(var i2 = 0; i2<numbersGroup.length;i2++){
					for(var i = 0; i<numbersGroup[i2].length;i++){
						anim = new _self.AnimateNumber( timelineArr[4], numbersGroup[i2][i] , (i/2)+(i2*2) , 2);
						anim.setTween();
					}
				}				
				timelineArr[5] = new TimelineMax();
				timelineArr[5].fromTo(allSlideElems.filter("[data-name='CHIFFRES PART']"), 0.5, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=1");
				
				timelineArr[5].fromTo(allSlideElems.filter("[data-name='CHIFFRES MARCHE PRO']"), 0.5, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=0.5");

				timelineArr[5].fromTo(allSlideElems.filter("[data-name='CHIFFRE PATRIMONIAL']"), 0.5, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=0.5");

				timelineArr[6] = new TimelineMax({repeat:-1,yoyo:true,repeatDelay:1.5});
				timelineArr[6].fromTo(allSlideElems.filter("[data-name='bras gauche']"), 1, {
					y: "0",
					x: "0",
					rotation: "0",
					transformOrigin: "120% 60%"
				}, {
					y: "-8",
					x: "4",
					rotation: "5",
					ease: Power1.easeInOut
				}, "+=0.5");

				return timelineArr;
			},
			"slide8": function(svgElem) {
				var timelineArr = [];
				var find = [
					"[data-name=yeux]",
					"[data-name=titre]",
					"[data-name*=bouton]",
					"[data-name*=fleche]",
					"[data-name=tete]",
					"[data-name=intro]",
					"[data-name='bras droite']",
					"[data-name='sites internet']",
					"[data-name=montre]",
					"[data-name=objet-montre]",
					"[data-name=iphonect]",
					"[data-name=anim-ipad]"
				].join(",");

				var allSlideElems = svgElem.find(find);
				var titreElem = allSlideElems.filter("[data-name='titre']");
				timelineArr[0] = new TimelineMax();
				tweenFadeFromLeft(timelineArr[0], allSlideElems.find("[data-name='titre gauche']"), "0.5");
				tweenPath(timelineArr[0], allSlideElems.find("[data-name='titre path'] path"), "+=0", "0% 102%", "102% 102%");
				tweenFadeFromRight(timelineArr[0], allSlideElems.find("[data-name='titre droite']"), "+=0");

				timelineArr[1] = new TimelineMax(); //Clignement yeux + scale des boutons + tete
				tweenClignement(timelineArr[1], allSlideElems.filter("[data-name=yeux]"), "0");
				tweenDodeline(timelineArr[1], allSlideElems.filter("[data-name='tete']"), "+=1");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton apple pay']"), "+=1");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton play ipad2']"), "+=1");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='bouton ipad3']"), "+=2");
				tweenElasticScale(timelineArr[1], allSlideElems.filter("[data-name='montre']"), "+=1");
				timelineArr[1].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[2] = new TimelineMax(); //fleches
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche1']"), "+=0", 4, 3);
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche2']"), "+=0", 3, 4);
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche3']"), "+=0", 4, 3);
				tweenFleche(timelineArr[2], allSlideElems.filter("[data-name='fleche4']"), "+=0", 6, -1);
				timelineArr[2].delay(1).repeatDelay(0).repeat(-1);

				timelineArr[3] = new TimelineMax();
				timelineArr[3].fromTo(allSlideElems.filter("[data-name='intro']"), 1, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=1");
				
				var pads = allSlideElems.filter("[data-name='anim-ipad']");
				timelineArr[3].fromTo(pads[0], 0.5, {
					y: "50",
					opacity: 0
				}, {
					y: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=0.1");

				timelineArr[3].fromTo(pads[1], 0.5, {
					y: "50",
					opacity: 0
				}, {
					y: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=0.1");

				timelineArr[3].fromTo(pads[2], 0.5, {
					y: "50",
					opacity: 0
				}, {
					y: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=0.1");

				timelineArr[3].fromTo(allSlideElems.filter("[data-name='iphonect']"), 0.5, {
					x: "2",
					y: "20",
					opacity: 0
				}, {
					x: "0",
					y: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=0.1");

				timelineArr[3].fromTo(allSlideElems.filter("[data-name='objet-montre']"), 1, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=0.5");


				timelineArr[3].fromTo(allSlideElems.filter("[data-name='sites internet']"), 1, {
					x: "-50",
					opacity: 0
				}, {
					x: "0",
					opacity: 1,
					ease: Power1.easeInOut
				}, "+=0.5");


				timelineArr[4] = new TimelineMax({repeat:-1,yoyo:true,repeatDelay:1.5});
				timelineArr[4].fromTo(allSlideElems.filter("[data-name='bras droite']"), 1, {
					y: "0",
					x: "0",
					rotation: "0",
					transformOrigin: "-20% 60%"
				}, {
					y: "-6",
					x: "-3",
					rotation: "-5",
					ease: Power1.easeInOut
				}, "+=0.5");

				return timelineArr;
			},
		}
		return scenes;
	};

	proto.AnimateNumber = function() {
		var _arr = null;
		var i = 0;
		var L = 0;

		var strToFloat = function(str, useComma) {
			if (useComma === ",") {
				return parseFloat(str.replace(/\,/g, ".").replace(/\ /g, ""));
			} else if (useComma === ".") {
				return parseFloat(str.replace(/\,/g, ".").replace(/\ /g, ""));
			}

			return parseFloat(str.replace(/\ /g, ""));
		};

		var floatToStrOnMap = function(val, i) {
			if ((i + 1) % 3 === 0) {
				return " " + val;
			}
			return val;
		};

		var floatToStr = function(fl, useComma) {
			fl = ~~(fl * 100) / 100;
			_arr = fl.toString().split(".");
			_arr[0] = _arr[0].split("").reverse().map(floatToStrOnMap).reverse().join("").trim();
			return _arr.join(useComma);
		};

		var updateValue = function(txtElem, unitStart, val, unitEnd, useComma) {
			if (useComma === null) {
				txtElem.text(unitStart + floatToStr(~~(val), useComma) + unitEnd);
			} else {
				txtElem.text(unitStart + floatToStr(val, useComma) + unitEnd);
			}
		};

		var AnimateNumber = function(timeline, target, delay, time) {
			//time = 5;
			var unitStart = "";
			var unitEnd = "";
			var _this = this;
			var useComma = null;
			var animStarted = false;
			var callBack = null;
			if (typeof(time) === "undefined") {
				time = delay;
				delay = 0;
			}

			var obj = {
				value: 0
			};

			//var txtElem = $($(target).find("text")[0]);
			var txtElem = $(target);
			var txtContOrig = txtElem.text().trim();

			if (txtContOrig.match(",")) {
				useComma = ",";
			} else if (txtContOrig.match("\\.")) {
				useComma = ".";
			}

			L = txtContOrig.length;

			for (i = 0; i < L; i++) {
				if (isNaN(txtContOrig[i]) === true || txtContOrig[i] === " ") {
					unitStart += txtContOrig[i];
				} else {
					break;
				}
			}

			txtContOrig = txtContOrig.substr(i);

			L = txtContOrig.length;

			for (i = L - 1; i > 0; i--) {
				if (isNaN(txtContOrig[i]) === true || txtContOrig[i] === " ") {
					unitEnd = txtContOrig[i] + unitEnd;
				} else {
					break;
				}
			}

			txtContOrig = txtContOrig.substr(0, i + 1);

			var txtContOrigFl = strToFloat(txtContOrig, useComma);

			this.setTween = function() {

				updateValue(txtElem, unitStart, txtContOrigFl * obj.value, unitEnd, useComma);
				timeline.to(obj,0.001,{
					value:0,
					onUpdate : function(){
						updateValue(txtElem, unitStart, txtContOrigFl * 0, unitEnd, useComma);
					},
					onComplete : function(){
						timeline.fromTo(obj,parseFloat(time),
						{
							value: 0
						}, {
							value: 1,
							onUpdate: function(prog) {
								updateValue(txtElem, unitStart, txtContOrigFl * obj.value, unitEnd, useComma);
							},
							ease: Power2.easeOut
						},parseFloat(delay));
					}
				});
				
			}.bind(this);
		}

		return AnimateNumber;
	}();

	return _construct;
}();