var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var scss = require('gulp-sass');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
 
var paths = {
	scss: {
		src: "src/scss/*.scss",
		dist: "dist/css"
	},
	pug: {
		src: "src/pug/*.pug",
		dist: "dist"
	},
	ts: {
		entries: ['src/ts/main.ts'],
		src: "src/ts/*.ts",
		bundle: "bundle.js",
		dist: "dist/js"
	},
	bs: {
		baseDir: "dist"
	}
};

gulp.task("pug", function() {
	return gulp.src(paths.pug.src)
		.pipe(plumber())
		.pipe(pug({
			"pretty": true,
			data: { fs: require('fs') }
		}))
		// .pipe(plumber.stop())
		.pipe(gulp.dest(paths.pug.dist))
		.pipe(browserSync.stream());
})

// Compile sass into CSS & auto-inject into browsers
gulp.task('scss', function() {
	return gulp.src(paths.scss.src)
		.pipe(plumber())
		.pipe(scss())
		.pipe(gulp.dest(paths.scss.dist))
		.pipe(browserSync.stream());
});

gulp.task("ts", function() {
	return browserify({
		basedir: '.',
		debug: true,
		entries: paths.ts.entries,
		cache: {},
		packageCache: {}
	})
	.plugin(tsify)
	.transform('babelify', {
		presets: ['es2015'],
		extensions: ['.ts']
	})
	.bundle()
	.on('error', function (error) { console.error(error.toString()); })
	.pipe(source(paths.ts.bundle))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(sourcemaps.write(paths.ts.dist))
	.pipe(gulp.dest(paths.ts.dist))
	.pipe(browserSync.stream())
});

// Static server
gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: paths.bs.baseDir
		},
		browser: "chromium-browser"
	});
});

gulp.task('default', ['pug', 'scss', 'ts', 'serve'], function () {
	gulp.watch(paths.scss.src, ['scss']);
	gulp.watch(paths.pug.src, ['pug']);
	gulp.watch(paths.ts.src, ['ts']);
	gulp.watch([paths.pug.src]).on('change', browserSync.reload);
});