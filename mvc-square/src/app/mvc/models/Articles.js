models.Article = function() {
	
	class Article extends Model{
		constructor(parent){
			super();
			this.parent = parent;
		}
	}

	return Article;
}();