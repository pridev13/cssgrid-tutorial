const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function compileScss() {

	return gulp.src('*/*.scss')
		.pipe(sass())
    .pipe(prefix(['> 0.1%', 'ie 8', 'ie 7'], { cascade: true })) // pass the file through autoprefixer
    .pipe(gulp.dest('.'))
    .pipe(browserSync.reload({
      stream: true
    }))

}

function watchTask() {
	gulp.watch(
		['*/*.scss', '*/*.html'],
			gulp.parallel(compileScss)
	);
}

function browserSyncInit() {

	browserSync.init({
	   startPath: '/CSS/cssgrid',
	   proxy: "localhost"
	});

}

exports.default = gulp.series(compileScss, gulp.parallel(browserSyncInit, watchTask));
