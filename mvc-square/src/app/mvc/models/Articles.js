(function() {

	class Article extends Model{
		constructor(parent){
			super();
			this.parent = parent;
		}
	}

	mvc.addModel(Article);

})();