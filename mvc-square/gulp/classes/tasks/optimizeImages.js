const gm = require("gulp-gm");
const fs = require("fs");

function getFilesizeInBytes(filename) {
	var stats = fs.statSync(filename);
	var fileSizeInBytes = stats["size"];
	return fileSizeInBytes;
}

var initTask = function(taskArgs) {
	var fileSizeKoMax = 500; //ko
	var pxMax = 700; //px
	var fileSizeKo = 0;
	var s = 0;
	var w = 0;
	var h = 0;
	var rW = 0;
	var rH = 0;
	taskArgs.gulp.task("optimizeImages", () => {
		return taskArgs.gulp.src(taskArgs.ARBO.dist.appMvcAssets + "img/**/*")
			.pipe(gm((gmfile, done) => {
				gmfile.size(function(err, size) {

					fileSizeKo = ~~(getFilesizeInBytes(gmfile.source) / 1000);

					s = pxMax;
					w = size.width;
					h = size.height;

					if (fileSizeKo > fileSizeKoMax) {
						w = ~~(w / (fileSizeKo / fileSizeKoMax));
						h = ~~(h / (fileSizeKo / fileSizeKoMax));
					}

					rW = w / s;
					rH = h / s;

					if (rW > 1 || rH > 1) {

						if (rW > rH) {

							done(null, gmfile.resize(
								s,
								h / rW
							));
						} else {

							done(null, gmfile.resize(
								w / rH,
								s
							));
						}

					} else {

						done(null, gmfile.resize(
							w,
							h
						));
					}

				});
			}))
			.pipe(taskArgs.gulp.dest(taskArgs.ARBO.dist.appMvcAssets + "img/"));
	});
};

module.exports = {
	initTask: initTask
};