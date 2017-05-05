var EventManager = function() {

	class EventManager{
		constructor(){
			this._listeners = {};
		}

		addListener(type, listener){
			if (typeof this._listeners[type] == "undefined"){
				this._listeners[type] = [];
			}

			this._listeners[type].push(listener);
		}

		fire(event){
			if (typeof(event) == "undefined"){
				event = { type: event };
			}

			if (!event.target){
				event.target = this;
			}

			if (!event.context){
				event.context = this;
			}

			if (!event.type){  //falsy
				throw new Error("Event object missing 'type' property.");
			}

			if (this._listeners[event.type] instanceof Array){
				var listeners = this._listeners[event.type];
				var i=0, len=listeners.length;
				for (; i < len; i++){
					listeners[i](event);
				}
			}
		}

		removeListener(type, listener){
			var L = 0;
			var i = 0;
			var listeners = null;
			if (this._listeners[type] instanceof Array){
				listeners = this._listeners[type];
				i=0;
				L=listeners.length;
				for (;i<L;i++){
					if (listener !== null && listeners[i] === listener){
						listeners.splice(i, 1);
						break;
					}else if(listener === null){
						listeners.splice(i, 1);
					}
				}
			}
		}

		removeListenerAll(){
			var J = null;
			var i = 0;
			var L = 0;
			for(J in this._listeners){
				i = 0;
				L = this._listeners[J].length;
				for(;i<L;i++){
					this.removeListener(J, this._listeners[J][i]);
				}
			}
		}
	}

	return EventManager;
}();