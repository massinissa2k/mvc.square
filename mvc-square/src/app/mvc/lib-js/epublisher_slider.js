/*if( typeof( OBJECTMAIN ) === "undefined" )
{
	var OBJECTMAIN = { PAUSELEVEL_0 : false , DELAY_ANIM : 500 , DELAY_ANIM_CURRENT : 0 };
}*/

var Epublisher_slider = function() {
	"use strict";
	//var MOVESTAT = false;
	var FORMATOSTYPE = "";
	var isTouchable = null;
	var ANIMATION_TIME = 600;
	var ANIMATION_TIME_SPEED = 500;
	var ANIMATION_TIME_HREF = 500;
	var UID = 0;

	var animate = function(time) {
		requestAnimFrame(animate);
		TWEEN.update(time);
	}

	var _construct = function(conf, _OBJECT) {
		animate();
		/*TODO

		conf.containHtml
		conf.isResizable
		*/

		if (FORMATSCREENTYPE === "tab" || FORMATSCREENTYPE === "phone") {
			//document.body.scrollTop = 0;
			conf.parallax.enable = false;
		}

		var _this = this;
		this.win = $(window);
		this._OBJECT = _OBJECT;
		this.cName = "Epublisher_slider";
		this.conf = conf;
		this.basicElement = conf.basicElement;
		this.stopAll = false;
		this.conf.containHtml = false;
		this.conf.isResizable = true;
		this.conf.mobileDraggable = false;

		this.moveThummbnails = false;
		this.removed = false;
		this.isOnScrolling = false;
		this.isOnScrollingTimer = null;
		this.sliderId = "slider_" + (UID++);
		this.strEvtPageChange = "changePage_" + this.sliderId;
		this.axesType = {
			x: {
				axe: "x",
				scrollAxe: "scrollWidth",
				pageAxe: "pageX",
				offsetAxe: "offsetX",
				sizeAxe: "width",
				wheelAxe: "deltaX",
				translate3d: function(elemStyle, axe, v, unit) {
					v = "translate3d(" + axe + unit + ",0,0)";
					elemStyle.transform = v;
					elemStyle.webkitTransform = v;
					elemStyle.msTransform = v;
				},
				translateSvg: function(elem, axe, v, unit) {
					v = "translate( " + ((~~(axe * 100)) / 100) + " 0 )";
					elem.setAttribute("transform", v);
				},
				cssAxe: function(axe, unit) {
					return {
						left: axe + unit
					};
				}
			},
			y: {
				axe: "y",
				scrollAxe: "scrollHeight",
				pageAxe: "pageY",
				offsetAxe: "offsetY",
				sizeAxe: "height",
				wheelAxe: "deltaY",
				translate3d: function(elemStyle, axe, v, unit) {
					v = "translate3d(0," + axe + unit + ",0)";
					elemStyle.transform = v;
					elemStyle.webkitTransform = v;
					elemStyle.msTransform = v;
				},
				translateSvg: function(elem, axe, v, unit) {
					v = "translate( 0 " + ((~~(axe * 100)) / 100) + ")";
					elem.setAttribute("transform", v);
				},
				cssAxe: function(axe, unit) {
					return {
						top: axe + unit
					};
				}
			}
		};
		this.eventLocalPageChange = new CustomEvent(this.strEvtPageChange);
		this.eventLocalPageChange.data = {
			evtType: null,
			currentIndex: null,
			datas: null,
			_ctx: this
		};

		this.eventSliderReady = new CustomEvent("eventSliderReady");
		this.eventSliderReady.data = {
			evtType: null,
			datas: {},
			_ctx: this
		};

		this.eventPageChange = new CustomEvent("pageChangeEpublisher_slider");
		this.eventPageChange.data = {
			evtType: null,
			datas: {},
			fooFrom: null,
			_ctx: this
		};


		this.enableAutoPlayBind = this.enableAutoPlay.bind(this);

		if (this.conf && this.conf.moveThummbnails) {
			this.moveThummbnails = this.conf.moveThummbnails;
		}

		if (this.conf && typeof(this.conf.coordsType) === "undefined") {
			this.conf.coordsType = "x"
		}

		this.currentIndexPassed = null;
		this.currentIndex = 0;

		if (isTouchable === null) {
			if ("ontouchstart" in window /*|| navigator.msMaxTouchPoints*/ ) {
				isTouchable = true;
			} else {
				isTouchable = false;
			}
		}

		this.touchable = isTouchable;

		this.nextPrevIndex = this.basicElement.find(".page-changer");

		this.viewerManager = new this.ViewerManager(this, this.basicElement, conf);
		if (this.stopAll === true) {
			return this;
		}

		this.thumbnailsManager = new this.ThumbnailsManager(this, this.basicElement, conf);
		this.bubbleManager = new this.BubbleManager(this, this.basicElement, conf);
		this.superLegende = new this.SuperLegende(this, this.basicElement, conf);

		this.parallaxManager = new this.ParallaxManager(this, this.viewerManager.steps, conf);

		this.checkNextPrevIndex();

		if (conf.isResizable === true) {
			//this.win.resize( function()
			window.addEventListener("resize", function() {
				_this.inPlaceIndex(0, true);
			}, false);
		}

		this.autoMoveTo = "nextIndex";
		this.autoPlayTimer = null;

		setTimeout(function() {
			_this.checkAutoPlay(_this.conf);
		}, this._OBJECT.DELAY_ANIM_CURRENT);

		_this._OBJECT.DELAY_ANIM_CURRENT += _this._OBJECT.DELAY_ANIM;

		this.checkHash();

	};

	var proto = _construct.prototype;

	proto.changeHash = function(pageTitle) {
		if (this.conf.hash && this.conf.hash.enable === true) {
			window.location.hash = this.conf.hash.listenURL + "=" + pageTitle;
		}
	};

	proto.checkHash = function() {
		if (this.conf.hash && this.conf.hash.enable === true) {
			this.hashChange(true);
			window.addEventListener("hashchange", this.hashChange.bind(this), false);
		}
	};

	proto.hashChange = function() {
		var view = null;
		var viewName = null;
		return function(goNow) {
			viewName = _UTILS.getUrlHash(this.conf.hash.listenURL);
			view = this.viewerManager.pageTitles[viewName];

			if (typeof(view) !== "undefined" && view !== null) {
				view = parseInt(view);
				if (view === this.currentIndex) {
					return false;
				}
				if (goNow) {
					this.gotoByIndexNow(view);
				} else {
					this.gotoByIndex(view);
				}


				/*setTimeout( function(){
					this.gotoByIndex(view);}.bind(this),
					100
				);*/
			}

			return false;
		}
	}();

	proto.isOnScroll = function() {
		this.isOnScrolling = true;
		clearTimeout(this.isOnScrollingTimer);
		this.isOnScrollingTimer = setTimeout(function() {
			this.isOnScrolling = false;
		}.bind(this), 10);
	};

	proto.getAxe = function() {
		return this.axesType[this.conf.coordsType];
	};

	proto.removeSlider = function() {
		this.viewerManager.removeEvent();
		this.removed = true;
	};

	proto.enableAutoPlay = function() {
		if (this._OBJECT && this._OBJECT.PAUSELEVEL_0 == false) {
			this[this.autoMoveTo]();
		}
		this.checkAutoPlay();
	};

	proto.pauseAutoPlay = function() {
		clearTimeout(this.autoPlayTimer);
	};

	proto.checkAutoPlay = function() {
		if (this.removed) {
			return false;
		}

		/*if( this.touchable )
		{
			return false;
		}*/

		clearTimeout(this.autoPlayTimer);

		if (typeof(this.conf.autoPlay) !== "undefined" && this.conf.autoPlay > 0) {
			this.autoPlayTimer = setTimeout(this.enableAutoPlayBind, this.conf.autoPlay);
		}
	};

	proto.checkNextPrevIndex = function() {

		var evtType = "click";
		return function() {
			var _this = this;
			if (this.nextPrevIndex.length) {
				if (this.touchable) {
					evtType = "touchend";
				}

				this.nextPrevIndex.bind(evtType, function() {
					var _thisJq = this;
					setTimeout(function() {
						if (MOVESTAT === false) {
							if ($(_thisJq).hasClass("next")) {
								_this.nextIndex();
							} else if ($(_thisJq).hasClass("prev")) {
								_this.prevIndex();
							}
						}
					}, 0)
				});
			}
		}
	}();

	proto.inPlaceIndex = function(t, fromRsize) {
		this.viewerManager.gotoByIndex(this.currentIndex, t, fromRsize, this, "inPlaceIndex");
	};

	proto.nextIndex = function() {
		if (this.currentIndex < this.viewerManager.stepsLength - 1) {
			this.currentIndex++;
			this.viewerManager.gotoByIndex(this.currentIndex, ANIMATION_TIME, null, this, "nextIndex");
		} else {
			this.autoMoveTo = "prevIndex";
		}
	};

	proto.prevIndex = function() {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			this.viewerManager.gotoByIndex(this.currentIndex, ANIMATION_TIME, null, this, "prevIndex");
		} else {
			this.autoMoveTo = "nextIndex";
		}
	};

	proto.gotoByIndex = function(i) {
		this.viewerManager.gotoByIndex(i, ANIMATION_TIME_HREF, null, this, "DOM");
	};

	proto.gotoByIndexNow = function(i) {
		this.viewerManager.gotoByIndex(i, ANIMATION_TIME_SPEED, null, this, "DOM");
	};

	proto.SuperLegende = function() {
		var _construct = function(parent, elem, conf) {
			var _this = this;
			this.parent = parent;
			this.enabled = false;
			this.conf = conf;
			this.elem = null;
			this.cName = "SuperLegende";
			this.lastStep = null;
			this.currStep = null;

			this.lastPos = null;
			this.currPos = 0;

			if (this.conf && this.conf.superLegende && this.conf.superLegende.enabled) {
				this.enabled = tthis.conf.superLegende.enabled;
			}

			if (this.enabled) {
				this.elem = elem.find(".super_legende");
				this.steps = this.elem.find(".steps");

				if (this.elem.length < 1) {
					this.enabled = false;
				} else {
					window.addEventListener(this.strEvtPageChange, this.gotoByIndex.bind(this));
				}
			}
		};

		var proto = _construct.prototype;

		proto.gotoByIndex = function(e) {
			this.currPos = e.data.currentIndex;

			if (this.currPos === this.lastPos) {
				return false;
			}

			this.currStep = $(this.steps.get(pos));

			//this.currStep.addClass("switch_visible");

			if (!this.lastStep) {
				this.lastStep = $(this.steps.get(0));
			}

			this.currStep.removeClass("transit-to-middle-from-left");
			this.currStep.removeClass("transit-to-middle-from-right");
			this.currStep.removeClass("transit-to-left");
			this.currStep.removeClass("transit-to-right");

			this.lastStep.removeClass("transit-to-middle-from-left");
			this.lastStep.removeClass("transit-to-middle-from-right");
			this.lastStep.removeClass("transit-to-left");
			this.lastStep.removeClass("transit-to-right");

			if (this.lastPos < this.currPos) {
				this.currStep.addClass("transit-to-middle-from-right");
				this.lastStep.addClass("transit-to-left");
			} else {
				this.currStep.addClass("transit-to-middle-from-left");
				this.lastStep.addClass("transit-to-right");
			}

			this.lastPos = this.currPos;
			this.lastStep = this.currStep;
		};

		return _construct;
	}();

	proto.ViewerManager = function() {
		var _construct = function(parent, elem, conf) {
			this.parent = parent;
			var _self = this;
			this.conf = conf;
			this.viewerConteneur = elem.find(".viewer_conteneur");
			this.viewer = elem.find(".viewer");
			this.steps = this.viewer.find(".steps");

			this.stepsArray = this.steps.toArray();

			this.stepsLength = this.steps.length;
			this.pageTitlesArr = new Array(this.stepsLength);
			this.pageTitles = {};

			this.currentstartedAnimation = false;
			this.currentEvtAnimation = null;
			this.currentOriAxeAnimation = null;

			var i = 0;
			var st = null;

			for (; i < this.stepsLength; i++) {
				st = this.steps[i].getAttribute("hashpath");
				this.pageTitlesArr[i] = st;
				this.pageTitles[st] = i;
			}

			this.isAnimate = false;
			this.currentEasing = TWEEN.Easing.Sinusoidal.InOut;
			this.currentEasingLinear = TWEEN.Easing.Sinusoidal.Out;

			this.cName = "ViewerManager";

			/*if( this.parent.touchable )
			{
				this.currentEasing 		= TWEEN.Easing.Sinusoidal.Out;
			}*/

			//TO DO ANDREI onResize
			this.cameraSizeAxe = this.viewer[this.parent.getAxe().sizeAxe]();

			if (this.stepsLength < 1) {
				this.parent.stopAll = true;
				return this;
			}

			this.lastElem = null;
			this.currElem = null;
			this.objLoc = {};
			this.objLoc["x"] = 0;
			this.objLoc["y"] = 0;
			this.objLoc["ctx"] = this;

			this.objLocTo = {};
			this.objLocTo["x"] = 0;
			this.objLocTo["y"] = 0;

			this.objectToAnimat = this.objLoc;

			this._Tween = new TWEEN.Tween(this.objLoc)
				.easing(this.currentEasing)
				.onUpdate(this.progressAnimation)
				.onComplete(this.onComplete.bind(this))
				.onStart(this.tweenOnStart.bind(this));

			if (this.conf.containHtml) {
				this.steps.find("img").attr({
					unselectable: "on",
					draggable: "false"
				});
			}

			this.diffAxe = new DifferentialTool(0);
			this.diffAxe.type = this.parent.getAxe().axe;

			this.creatEvent(this.viewerConteneur);

			this.parent.eventSliderReady.data.datas.elem = $(this.steps[0]);
			window.dispatchEvent(this.parent.eventSliderReady);

		};

		var proto = _construct.prototype;

		proto.draw = function() {
			//this.currentEvtAnimation = e;
			//this.currentOriAxeAnimation = getOriAxe( e , this.parent.getAxe().pageAxe );
			if (this.currentstartedAnimation) {
				this.onDragCoords(this.currentOriAxeAnimation, this.currentEvtAnimation);
			}
		};

		proto.loopAnimation = function() {
			var _self = null;
			return function() {
				_self = this;
				requestAnimFrame(function() {
					_self.loopAnimation();
					_self.draw();
				});
			}
		}();

		proto.loadImgs = function() {
			var i = 0;
			var srsimage = null;
			return function(steps, L) {
				for (i = 0; i < L; i++) {
					srsimage = steps[i].getAttribute("srcimage");

					if (!srsimage) {
						continue;
					}

					this.loadImg(steps[i], steps[i].getAttribute("srcimage"));
				}
			}
		}();

		proto.loadImg = function() {
			var img = null;
			var loaded = function(elem) {
				this.elem.setAttribute("loading", "false");
				this.elem.style.backgroundImage = "url(" + this.src + ")";
			};

			return function(elem, src) {
				img = new Image();
				img.src = src;
				img.elem = elem;
				img.onload = loaded;
			}
		}();

		proto.getPrc = function() {
			var w = 0;
			return function() {
				return (~~(((this.objectToAnimat[this.parent.getAxe().axe] / this.viewer[0][this.parent.getAxe().scrollAxe])) * 1000) / 1000);
			}
		}();

		proto.getRelativePrc = function() {
			var prc1 = null;
			var locPrc = null;
			return function() {
				prc1 = this.getPrc() + (1 / this.stepsLength);
				locPrc = (this.getPrc() + (this.parent.currentIndex / this.stepsLength)) / (1 / this.stepsLength);
				return locPrc;
			}
		}();

		proto.managCoords = function(elem) {
			if (this.conf.parallax.type == "onSlide") {
				this.parent.parallaxManager.managCoords(this.getPrc());
			}

			if (_UTILS.getSupportedTransform()) {
				this.parent.getAxe().translate3d(elem[0].style, ~~this.objectToAnimat[this.parent.getAxe().axe], null, "px");
			} else {
				elem.css(this.parent.getAxe().cssAxe(~~this.objectToAnimat[this.parent.getAxe().axe], "px"));
			}
		};

		proto.onComplete = function() {
			this.isAnimate = false;
		};

		proto.tweenOnStart = function() {
			this.isAnimate = true;
		};

		proto.progressAnimation = function() {
			this.isAnimate = true;
			this.ctx.managCoords(this._elem, this.x);
		};

		proto.animateIt = function(ctx, d, sw, w, axe, elem, fName) {
			this.objLocTo.x = axe;
			this.objLocTo.y = axe;
			this.objLoc._elem = elem;
			if (fName === "gotoBestPosAxe") {
				this._Tween.easing(this.currentEasingLinear);
			} else {
				this._Tween.easing(this.currentEasing);
			}

			this._Tween.to(this.objLocTo, d).start();
		};

		proto.animateAxe = function() {
			var d = 0;
			var sw = 0;
			var w = 0;

			return function(elem, axe, t, fName) {
				this._Tween.stop();
				if (this.parent.moveThummbnails) {
					//sw = this.parent.thumbnailsManager.viewer[0].scrollWidth;
					//w = this.parent.thumbnailsManager.viewer.width();
				}

				this.animateIt(this, t, sw, w, axe, elem, fName);
			}
		}();

		proto.gotoBestPosAxe = function() {
			var pos = 0;
			var w = 0;
			return function(diff) {
				pos = 0;
				w = this.viewer[0][this.parent.getAxe().scrollAxe];
				pos = (((this.objectToAnimat[this.parent.getAxe().axe] / w) * this.stepsLength));

				if (diff > 0) {
					pos = Math.ceil(pos);
				} else if (diff < 0) {
					pos = Math.floor(pos);
				} else {
					pos = Math.round(pos);
				}

				if (pos > 0) {
					pos = 0;
				} else if (pos < -(this.stepsLength - 1)) {
					pos = this.stepsLength - 1;
				}

				pos = Math.abs(pos);

				this.gotoByIndex(pos, ANIMATION_TIME, null, this, "gotoBestPosAxe");
				//_UTILS.classManager( window.document.body , "current_view-" , this.parent.currentIndex );
			}
		}();

		proto.toRemoveClass = function(elem) {
			setTimeout(function() {
				if (elem[0].isReadyToRemove === true) {
					elem.removeClass("is-current");
				}
			}.bind(this), 400);
		};

		proto.requested = function() {
			var currElem = null;
			var currIndex = 0;
			var translateAxe = 0;
			return function(elem, ind, t, fName) {
				this.parent.currentIndex = ind;

				if (this.lastElem === null) {
					this.lastElem = this.viewer.find(".is-current");
				}

				this.lastElem[0].isReadyToRemove = true;
				this.toRemoveClass(this.lastElem);

				this.currElem = currElem = elem;
				currElem[0].isReadyToRemove = false;
				currElem.addClass("is-current");

				this.parent.changeHash(this.pageTitlesArr[this.parent.currentIndex]);

				//set page change
				this.parent.eventPageChange.data.datas.fooFrom = fName;
				this.parent.eventPageChange.data.datas.elem = this.currElem;
				window.dispatchEvent(this.parent.eventPageChange);

				this.parent.eventLocalPageChange.data.currentIndex = this.parent.currentIndex;

				window.dispatchEvent(this.parent.eventLocalPageChange);
				this.lastElem = currElem;

				translateAxe = -(~~((ind / this.stepsLength) * this.viewer[0][this.parent.getAxe().scrollAxe]));
				//debugger;
				this.animateAxe(this.viewer, translateAxe, t, fName);
			}
		}();

		proto.gotoByIndex = function(ind, t, fromRsize, parent_ctx, fName) {
			this.parent.currentIndexPassed = ind;
			this.parent.currentIndex = ind;
			this.requested($(this.steps[ind]), ind, t, fName);
			_UTILS.classManager(window.document.body, "current_view-", this.parent.currentIndex);
			_UTILS.classManager(window.document.body, "current_view_name-", this.pageTitlesArr[this.parent.currentIndex]);
			if (this.conf.bubbleManager.enabled) {
				this.parent.bubbleManager.gotoByIndex(ind);
			}

		};

		proto.onDragCoords = function(axe, e) {
			this.parent.pauseAutoPlay();
			this.diffAxe.setDiff(axe);
			this.objectToAnimat[this.parent.getAxe().axe] += this.diffAxe.getDiff();
			this._Tween.stop();
			this.managCoords(this.viewer);
			//e.preventDefault();
		};

		proto.onWheelCoords = function(axe, e) {
			if (axe > 0) {
				this.parent.prevIndex();
			} else if (axe < 0) {
				this.parent.nextIndex();
			}
		};

		proto.onDropCoords = function(axe) {
			this.gotoBestPosAxe(this.diffAxe.getDiff());
			this.diffAxe.ressetDiff();
			this.parent.checkAutoPlay();
		};

		proto.onWheelEndCoords = function(axe) {
			/*this.gotoBestPosAxe( this.diffAxe.lastVal + this.diffAxe.getDiff() );
			this.diffAxe.ressetDiff();
			this.parent.checkAutoPlay();*/
		};

		proto.creatEvent = function() {
			var draggable = false;
			var started = false;
			var localIstouchable = false;
			var getOriAxe = function(e, pageAxe) {
				if (localIstouchable) {
					return e.originalEvent.touches[0][pageAxe];
				}

				return e.originalEvent[pageAxe];
			};

			var xTouchStart = 0;
			var touchstart = function(e) {
				xTouchStart = getOriAxe(e, this.parent.getAxe().pageAxe);
				window.cancelClickFromSlider = false;
				started = true;
				draggable = false;
				this.currentstartedAnimation = started;
			};

			var touchend = function(e) {
				if (started === true && draggable === true) {
					_UTILS.preventDefault(e);
				}

				if (started === true) {
					this.onDropCoords(e[this.parent.getAxe().offsetAxe]);
				}

				if (started === true) {
					this.parent.bubbleManager.checkClick(e);
				}

				draggable = false;
				started = false;
				this.currentstartedAnimation = started;
			};

			var touchmove = function(e) {
				var _self = null;
				var waitingFrame = false;
				var draggable = false;

				return function(e) {
					window.cancelClickFromSlider = true;
					_UTILS.preventDefault(e);
					if (started === true) {
						draggable = true;
						/*_self = this;

						this.currentstartedAnimation = started;
						this.currentEvtAnimation = e;
						this.currentOriAxeAnimation = getOriAxe( e , this.parent.getAxe().pageAxe );*/
						this.onDragCoords(getOriAxe(e, this.parent.getAxe().pageAxe), e);
					}
				}
			}();

			var timerClear = 900;
			var dateWheel = Date.now();
			var dateWheelCurr = 0;
			var delta = 0;
			var timWheel = null;
			var mousewheel = function(e) {
				mousewheelTimer.bind(this)(e, $(e.originalEvent.currentTarget));
			};

			var mousewheelTimer = function(e, elem) {
				delta = 0;
				if (!e.originalEvent) /* For IE. */ {}

				if (e.originalEvent.wheelDelta) {
					delta = e.originalEvent.wheelDelta / 120;
				} else if (e.originalEvent.detail) {
					delta = -e.originalEvent.detail / 3;
				}

				if (delta) {
					if (Math.abs(delta) < 0.25) {
						_UTILS.preventDefault(e.originalEvent);
						return false;
					}

					dateWheelCurr = Date.now() - dateWheel;

					if (dateWheelCurr > timerClear) {
						dateWheel = Date.now();
					} else {
						_UTILS.preventDefault(e.originalEvent);
						return false;
					}

					this.onWheelCoords((delta * 10), e);

				}
				_UTILS.preventDefault(e.originalEvent);
			};

			return function(elem) {
				elem.data("this", this);

				localIstouchable = this.parent.touchable;

				elem.unbind();

				if (this.parent.touchable) {
					elem.bind("touchstart", touchstart.bind(this));
					elem.bind("touchend", touchend.bind(this));
					elem.bind("touchmove", touchmove.bind(this));
				} else {
					elem.bind("mousedown", touchstart.bind(this));
					elem.bind("mouseup", touchend.bind(this));
					elem.bind("mouseleave", touchend.bind(this));
					elem.bind("mousemove", touchmove.bind(this));
					elem.bind("mousewheel", mousewheel.bind(this));
					elem.bind("DOMMouseScroll", mousewheel.bind(this));
				}
				return false;
			};
		}();

		proto.removeEvent = function() {
			this.viewerConteneur.unbind();
		};

		return _construct;
	}();

	proto.ThumbnailsManager = function() {
		var _construct = function(parent, elem, conf) {
			this.parent = parent;
			this.cName = "ThumbnailsManager";
			this.viewerManager = this.parent.viewerManager;
			this.conf = conf;
			this.viewer = elem.find(".thumbnails");
			this.enabled = false;

			if (this.conf && this.conf.thumbnailsManager && this.conf.thumbnailsManager.enabled) {
				this.enabled = this.conf.thumbnailsManager.enabled;
			}

			if (!this.enabled || !this.viewer.length) {
				return this;
			}

			this.steps = this.viewer.find(".steps");
			this.stepsLength = this.steps.length;
			this.lastElem = null;
			this.currElem = null;
			this.currIndex = null;
			window.addEventListener(this.strEvtPageChange, this.pageIsChanged.bind(this));
		};

		var proto = _construct.prototype;

		proto.onClick = function() {
			var evtType = null;
			return function() {
				evtType = "click";

				if (this.touchable) {
					evtType = "touchend";
				}

				if (MOVESTAT === false) {
					this.steps.bind(evtType, this.click.bind(this));
				}
			}
		}();

		proto.pageIsChanged = function(e) {
			if (this.lastElem === null) {
				this.lastElem = this.viewer.find(".is-current");
			}

			this.lastElem.removeClass("is-current");
			this.currElem.addClass("is-current");
			this.lastElem = this.currElem;
		};

		proto.click = function(e, stopPropagation) {
			this.currElem = $(e.currentTarget);
			this.currIndex = this.currElem.index();
			this.parent.currentIndex = this.currIndex;

			if (stopPropagation != true) {
				this.viewerManager.gotoByIndex(this.currIndex, ANIMATION_TIME, null, this, "click");
			}

			if (e.preventDefault) {
				e.preventDefault();
			}
		};

		proto.managCoords = function(axe) {
			if (_UTILS.getSupportedTransform()) {
				this.parent.getAxe().translate3d(this.viewer[0].style, ~~axe, null, "px");
			} else {
				this.viewer.css(this.parent.getAxe().cssAxe(~~axe, "px"));
			}
		};

		proto.gotoByPrc = function() {
			var sw = null;
			return function(prc, w, scrollAxe) {
				if (this.parent.moveThummbnails) {
					sw = scrollAxe * prc;
					if (-(w / 2) <= sw) {
						sw = 0;
					} else {
						sw = sw + (w / 2);
					}

					if (-(scrollAxe - w) >= sw) {
						sw = -(scrollAxe - w);
					}

					this.managCoords(sw);
				}
			}
		}();

		proto.gotoByIndex = function(ind, stopPropagation) {
			this.currElem = $(this.steps.get(ind));
			this.currIndex = this.currElem.index();
			this.parent.currentIndex = this.currIndex;

			this.pageIsChanged();

			return true;
		};

		return _construct;
	}();

	proto.BubbleManager = function() {
		var _construct = function(parent, elem, conf) {
			this.parent = parent;
			this.touchable = this.parent.touchable;
			this.cName = "BubbleManager";
			this.viewerManager = this.parent.viewerManager;
			this.pagesLength = this.viewerManager.stepsLength;

			this.conf = conf;
			this.viewer = elem.find(".bubbles");

			if (this.conf && this.conf.bubbleManager && this.conf.bubbleManager.enabled) {
				this.enabled = this.conf.bubbleManager.enabled;
			}

			if (!this.enabled || !this.viewer.length) {
				return this;
			}

			this.currElem = null;
			this.currIndex = null;
			this.createBubbles();

			this.steps = this.viewer.find(".steps");
			//this.onClick();

			this.lastElem = null;

			window.addEventListener(this.strEvtPageChange, this.pageIsChanged.bind(this));
		};

		var proto = _construct.prototype;

		proto.createBubbles = function() {
			var st = null;
			var is_current = null;
			var content = null;
			return function() {
				st = this.pagesLength;
				is_current = ' is-current';
				content = '';
				if (this.conf.bubbleManager.content === 'increment') {
					content = 0;
				}
				while (st--) {
					if (this.conf.bubbleManager.content === 'increment') {
						content++;
					}

					this.viewer.append("<li class='steps" + is_current + "' ><div class='v-align-m'></div><span>" + content + "</span></li>");
					is_current = "";
				}
			}
		}();

		proto.checkClick = function() {
			var b = null;
			var bs = null;
			var bsL = null;
			return function(e) {
				b = $(e.target);
				bs = b.parent(".bubbles");
				bsL = bs.length;

				if (bsL > 0) {
					b.bind("click", this.click.bind(this));
				}
			}
		}();

		proto.onClick = function() {
			var evtType = null;
			return function() {
				evtType = "click";

				if (this.touchable) {
					evtType = "touchend";
				}

				if (MOVESTAT === false) {
					this.steps.bind(evtType, this.click.bind(this));
				}
			}
		}();

		proto.pageIsChanged = function() {
			if (this.lastElem === null) {
				this.lastElem = this.viewer.find(".is-current");
			}

			this.lastElem.removeClass("is-current");
			this.currElem.addClass("is-current");
			this.lastElem = this.currElem;
		};

		proto.click = function(e, stopPropagation) {
			this.currElem = $(e.currentTarget);
			this.currIndex = this.currElem.index();
			this.parent.currentIndex = this.currIndex;

			if (stopPropagation != true) {
				this.viewerManager.gotoByIndex(this.currIndex, ANIMATION_TIME, null, this, "click");
			}

			if (e.preventDefault) {
				e.preventDefault();
			}
		};

		proto.gotoByIndex = function(ind, stopPropagation) {
			this.currElem = $(this.steps.get(ind));
			this.currIndex = this.currElem.index();
			this.parent.currentIndex = this.currIndex;

			this.pageIsChanged();

			return true;
		};

		return _construct;
	}();

	proto.ParallaxManager = function() {
		var _construct = function(parent, elem, conf) {
			var _this = this;
			this.parent = parent;
			this.cName = "ParallaxManager";
			this._rootParent = this.parent;
			this.enable = false;
			this.conf = conf;

			this.paraLength = 0;

			for (var i = 0; i < elem.length; i++) {
				$(elem[i]).find(".layers .layer").attr("pageof", i);
			}

			this.elems = elem.find(".layers");
			this.elem = this.elems.find(".layer");

			if (typeof(this.conf.parallax) !== "undefined") {
				this.enable = this.conf.parallax.enable;
			}

			if (this.enable !== true) {
				return this;
			}

			this.parallaxs = [];

			this.initParallaxes();

			if (this.parent.conf.parallax.type == "onMouse") {
				$(this.elems).bind("mousemove", function(e) {
					_this.onMouseParralax(e);
				});
			}
		};

		var proto = _construct.prototype;

		proto.onMouseParralax = function(e) {
			var currTarget = $(e.currentTarget);
			
			if( this.conf.coordsType == "y" ){
				var mousePercent = e.clientY / currTarget.height();
			}
			else
			{
				var mousePercent = e.clientX / currTarget.width();
			}
			for (var i = 0; i < this.paraLength; i++) {
				if (this._rootParent.currentIndex === ~~(this.parallaxs[i].pageof)) {
					this.parallaxs[i].managCoords(mousePercent);
				}
			}
		}

		proto.initParallaxes = function() {
			this.paraLength = this.elem.length;

			this.elem.each(function(i, elem) {
				this.parallaxs.push(new this.parent.Parallax(this, $(elem), elem.getAttribute("pageof")));
			}.bind(this));
		};

		proto.managCoords = function(percent) {
			if (this.enable !== true) {
				return false;
			}

			for (var i = 0; i < this.paraLength; i++) {
				this.parallaxs[i].managCoords(percent);
			}
		}

		return _construct;
	}();

	proto.Parallax = function() {
		var _construct = function(parent, elem, pageof) {
			var _this = this;
			this.parent = parent;
			this.pageof = pageof;
			this.elem = elem;
			this.cName = "Parallax";
			this._rootParent = this.parent.parent;

			this.elemSizeAxe = this.elem[this._rootParent.getAxe().sizeAxe]();
			this.coefX = this.elem.attr("coef");

			this.translatefrom = ~~this.elem.attr("translatefrom") || 0;
			this.translateto = ~~this.elem.attr("translateto") || 0;
			this.layerposition = ~~this.elem.attr("layerposition") || 0;
			this.positionmax = ~~this.elem.attr("positionmax") || this.translatefrom;
			this.positionmin = ~~this.elem.attr("positionmin") || this.translateto;

			this.viewerManager = this._rootParent.viewerManager;
			this.cameraDiff = this.translateto - this.translatefrom;

		};

		var proto = _construct.prototype;

		proto.managCoords = function() {
			var locPrc = null;
			var goToPos = null;
			var prc1 = null;
			var max = null;
			var min = null;
			//ToDo andrei trouver meileure solution de gestion de mousePercent (gestion par argument ET pb onSlide)
			return function(percent) {
				if (this.parent.parent.conf.parallax.type == "onSlide") {
					prc1 = percent + (1 / this.viewerManager.stepsLength);

					locPrc = (percent + (this.layerposition / this.viewerManager.stepsLength)) / (1 / this.viewerManager.stepsLength);

					if (locPrc < -1) {
						locPrc = -1;
					} else if (locPrc > 2) {
						locPrc = 2;
					}
				} else if (this.parent.parent.conf.parallax.type == "onMouse") {
					locPrc = percent;
				}

				goToPos = this.translatefrom + (this.cameraDiff - (this.cameraDiff * locPrc));

				max = Math.max(this.positionmax, this.positionmin);
				min = Math.min(this.positionmax, this.positionmin);

				if (goToPos > max) {
					goToPos = max;
				} else if (goToPos < min) {
					goToPos = min;
				}

				if (_UTILS.getSupportedTransformSvg(this.elem[0], true)) {
					this._rootParent.getAxe().translateSvg(this.elem[0], goToPos, null, "");
				} else if (_UTILS.getSupportedTransform()) {
					this._rootParent.getAxe().translate3d(this.elem[0].style, goToPos, null, "px");
				} else {
					this.elem.css(this._rootParent.getAxe().cssAxe(goToPos, "px"));
				}
			}
		}();

		return _construct;
	}();

	return _construct;

}();