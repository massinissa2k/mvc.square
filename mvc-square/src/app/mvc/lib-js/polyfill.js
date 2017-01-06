//Ajout le prototype Bind
if( !Function.prototype.bind )
{
	Function.prototype.bind = function( ctx )
	{
		var _self = this;
		return function()
		{
			_self.apply( ctx , arguments );
		};
	};
}

//Ajout la class CustomEvent (new Event)
(function ()
{
	var CustomEvent = function( event, params )
	{
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	};
	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
})();

if( !Array.isArray )
{
	Array.isArray = function( arg )
	{
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}

if ( !document.querySelectorAll )
{
	document.querySelectorAll = function (selectors)
	{
		var style = document.createElement('style'), elements = [], element;
		document.documentElement.firstChild.appendChild(style);
		document._qsa = [];

		style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
		window.scrollBy(0, 0);
		style.parentNode.removeChild(style);

		while (document._qsa.length)
		{
			element = document._qsa.shift();
			element.style.removeAttribute('x-qsa');
			elements.push(element);
		}
		document._qsa = null;
		return elements;
	};
}

if (!document.querySelector)
{
	document.querySelector = function (selectors)
	{
		var elements = document.querySelectorAll(selectors);
		return (elements.length) ? elements[0] : null;
	};
}

//Ajout l'Api JSON
if ( !window.JSON )
{
	window.JSON =
	{
		parse: function(sJSON) { return eval('(' + sJSON + ')'); },
		stringify: (function ()
		{
			var toString = Object.prototype.toString;

			var isArray = Array.isArray || function (a)
			{
				return toString.call(a) === '[object Array]';
			};
			
			var escMap =
			{
				'"': '\\"'
				,'\\': '\\\\'
				,'\b': '\\b'
				,'\f': '\\f'
				,'\n': '\\n'
				,'\r': '\\r'
				,'\t': '\\t'
			};

			var escFunc = function (m)
			{
				return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
			};

			var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
			return function stringify(value)
			{
				if (value == null)
				{
					return 'null';
				}
				else if (typeof value === 'number')
				{
					return isFinite(value) ? value.toString() : 'null';
				}
				else if (typeof value === 'boolean')
				{
					return value.toString();
				}
				else if (typeof value === 'object')
				{
					if (typeof value.toJSON === 'function')
					{
						return stringify(value.toJSON());
					}
					else if (isArray(value))
					{
						var res = '[';
						for (var i = 0; i < value.length; i++)
						res += (i ? ', ' : '') + stringify(value[i]);
						return res + ']';
					}
					else if (toString.call(value) === '[object Object]')
					{
						var tmp = [];
						for (var k in value)
						{
							if (value.hasOwnProperty(k))
						tmp.push(stringify(k) + ': ' + stringify(value[k]));
						}
						return '{' + tmp.join(', ') + '}';
					}
				}
				return '"' + value.toString().replace(escRE, escFunc) + '"';
			};
		})()
	};
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame    || 
	window.oRequestAnimationFrame      || 
	window.msRequestAnimationFrame     || 
	function(/* function */ callback, /* DOMElement */ element){
	window.setTimeout(callback, 1000 / 60);
	};
})();