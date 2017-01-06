var DifferentialTool = function()
	{
		var _construct = function()
		{
			this.diffL = 0;
			this.type = null;
			this.totalMove = 0;
			this.diff = 0;
			this.lastDiff = 0;
			this.lastVal = null;
			this.requestToInitPos = null;
		};

		var proto = _construct.prototype;

		proto.setDiff = function( val )
		{
			if( this.lastVal === null )
			{
				this.lastVal = val;
			}

			this.diff = val - this.lastVal;

			this.totalMove += Math.abs( this.getDiff() );

			this.lastVal = val;
			this.lastDiff = this.getDiff();
			return this.getDiff();
		};

		proto.getDiff = function()
		{
			return this.diff;
		};

		proto.ressetDiff = function()
		{
			this.diffL = 0;
			this.lastVal = null;
			this.ressetMove();
			return false;
		};

		proto.getMove = function()
		{
			return this.totalMove;
		};

		proto.ressetMove = function()
		{
			this.totalMove = 0;
			return false;
		};

		return _construct;
	}();
