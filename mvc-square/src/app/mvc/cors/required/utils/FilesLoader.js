/*Class
 *Load multiple files width array file list
 *return Promise
 */
 (function(utils) {

	function onPromise(url, resolve, reject) {

		utils.loadFile("text", url, (data) => {
			if (data) {
				resolve([url, data]);
				return;
			}
			reject([url, data]);
		});
	}

	function getPromises(files) {
		let len = files.length;
		let prms = new Array(len);
		let i = 0;
		for (let J in files) {
			prms[i] = new Promise((resolve, reject) => {
				onPromise(files[J], resolve, reject);
			});
			i++;
		}
		return prms;
	}

	class FilesLoader {

		constructor(files) {
			this.files = files;
		}

		load() {
			return Promise.all(getPromises(this.files));
		}
	}
	
	Object.defineProperties(utils, {
		"FilesLoader": {
			value: FilesLoader,
			writable: false,
			enumerable: false
		}
	});

})(mvc.utils);