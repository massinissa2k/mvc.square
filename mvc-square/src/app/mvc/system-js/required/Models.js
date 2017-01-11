var Models = function() {

	class Models{
		constructor(parent, models){
			this.parent = parent;
			this.main = parent;
			this.models = models;
			this.modelsCreated = {};
		}

		load(modelName) {
			if ((modelName in this.modelsCreated) === false) {
				if ((modelName in this.models) === false) {
					console.warn("Model " + modelName + " does not exist!");
					return null;
				}

				this.modelsCreated[modelName] = new this.models[modelName](this);

			}
			return this.modelsCreated[modelName];
		}

	}

	return Models;
}();