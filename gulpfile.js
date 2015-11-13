var gulp = require("gulp");
var babel = require("gulp-babel");
var babelify = require('babelify');
var browserify = require('browserify');
var reactify = require('reactify'); 
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var minifyCss = require('gulp-minify-css');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();
var Server = require('karma').Server;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sasslint = require('gulp-sass-lint');


gulp.task('build', function() {	
    browserify({
		entries: './src/js/index.js',
		debug: true,
		shim: {
            redux: {
                path: '/node_modules/redux/dist/redux.js',
                exports: 'redux'
            },
            react: {
                path: '/node_modules/react/dist/react.js',
                exports: 'react',              
            },
			'react-dom': {
                path: '/node_modules/react-dom/dist/react-dom.js',
                exports: 'react-dom'
            },
			'react-redux': {
                path: '/node_modules/react-redux/dist/react-redux.js',
                exports: 'react-redux',
                depends: {
                    react: 'react'
                }
            },
			immutable: {
				path: '/node_modules/immutable/dist/immutable.min.js',
				exports: 'immutable'
			}
          }
    })	
    .transform(babelify)	
	.transform(reactify)	
    .bundle()
    .pipe(source('./index.js'))    
    .pipe(gulp.dest('./build'));
});

gulp.task('collect-templates', function () {
  return gulp
    .src([
        
    ])
    .pipe(gulp.dest('./build/templates'))
})

gulp.task('lint', function() {
  return gulp.src(['./src/js/**/*.js', '!node_modules/**'])
    .pipe(eslint('.eslintrc'))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('compress', function() {
  return gulp.src('./build/index.js')
	.pipe(sourcemaps.init())
    .pipe(uglify())
	.pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
});

gulp.task("compile", function () {
  return gulp.src("./src/js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./build/"));
});

gulp.task('build-styles', function() {
  return gulp.src('./src/style/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
  gulp.src('.src/sass/**/*.s+(a|c)ss')
	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
	.pipe(minifyCss({compatibility: 'ie8'}))
	.pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('.src/sass/**/*.scss', ['sass-lint', 'sass']);
});

gulp.task('sass-lint', function() {
  return gulp.src('.src/scss/*.s+(a|c)ss')
    .pipe(sasslint())
	.pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('dev', ['build', 'sass'], function() {	
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('src/js/**/*.js', ['build']).on("change", browserSync.reload);	
    gulp.watch('src/**/*.css', ['build-styles']).on("change", browserSync.reload);  
    gulp.watch('src/**/*.tmpl', ['collect-templates']).on("change", browserSync.reload);  
});

gulp.task('production', ['build', 'compress', 'sass']);