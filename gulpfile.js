var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	minifycss = require('gulp-minify-css'),
	combineMq = require('gulp-combine-mq'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

// processing of css

gulp.task('process-styles', function() {
	return sass('src/css/main.scss', {
			compass: true
		})
		.pipe(combineMq())
		.pipe(minifycss())
		.pipe(gulp.dest('public/css/'))
	    .pipe(reload({stream:true}));
});

// processing of js

gulp.task('process-scripts', function() {
	return gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js/'))
		.pipe(reload({stream:true}));
});

// processing of pngs, jpgs, svgs, gifs

gulp.task('process-images', function() {
	return gulp.src('src/img/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('public/img'))
		.pipe(reload({stream:true}));
});

// // watch changes in files and running task accordingly

// gulp.task('watch', function() {
// 	gulp.watch('src/css/**/*.scss', ['process-styles']);
// 	gulp.watch('src/js/*.js', ['process-scripts']);
// 	gulp.watch('src/img/**/*', ['process-images']);
// });

// start server

gulp.task('browser-sync', function() {
    browserSync({
        proxy: "localhost:8888"
    });
});

gulp.task('default', ['process-styles', 'process-scripts', 'process-images', 'browser-sync'], function () {
	gulp.watch(['craft/templates/*.html', 'craft/templates/**/*.html', 'craft/templates/**/**/*.html'], [browserSync.reload]);
	gulp.watch('src/css/**/*.scss', ['process-styles']);
	gulp.watch('src/js/*.js', ['process-scripts']);
	gulp.watch('src/img/**/*', ['process-images']);
});