const glob = require('glob');
const fs = require("fs");
const initTask = function(taskArgs) {
	taskArgs.gulp.task("regExpFinalTemplates", function(done) {
		done();
		return;
		rewriteFiles(done);
	});

	var rewriteFiles = function(done) {
		let r = null;
		let files = glob.sync(taskArgs.ARBO.dist.allTemplatesJst, {});
		files.forEach((e, i) => {
			r = fs.readFileSync(files[i], "utf8");
			try {
				r = docParser(r, files[i]);
			} catch (e) {}

			fs.writeFileSync(files[i], r);
			fs.chmodSync(files[i], 0o777);
			done();
		});
	};

	var document = null;
	var docParser = function(htmlStr, file) {
		if (htmlStr.match(/^(\<svg)/gi)) {
			var reg = new RegExp("xlink\:href\=\"([^<][^>]*)\.png\"", "gmi");
			htmlStr = htmlStr.replace(reg, (m, a) => {
				return "xlink:href=\"mvc/assets/img/slides/" + a + ".png\"";
			});

			var reg = new RegExp("\<title\>([^<][^>]*)\<\/title\>", "gmi");
			htmlStr = htmlStr.replace(reg, (m, a) => {
				return "";
			});
		}
		return htmlStr;
	};
};

module.exports = {
	initTask: initTask
};