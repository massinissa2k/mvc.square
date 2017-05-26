/*Class
 *Load multiple files width array file list
 *return Promise
 */
let FilesLoader = function(){

	function onPromise(url, resolve, reject){

		_UTILS.loadFile("text", url, (data)=>{
			if(data){
				resolve([url, data]);
			}else{
				reject([url, data]);
			}
		});
	}

	function getPromises(files){
		let len = files.length;
		let prms = new Array(len);
		let i = 0;
		for(let J in files){
			prms[i] = new Promise((resolve, reject)=>{
				onPromise(files[J], resolve, reject);
			});
			i++;
		}
		return prms;
	}

	class FilesLoader{

		constructor(files){
			this.files = files;
		}

		load(){
			return Promise.all(getPromises(this.files));
		}
	}

	return FilesLoader;
}();