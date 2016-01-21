var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var ngmin = require('gulp-ngmin');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


// js minify
gulp.task('js-minify', ['clear-all-js'], function() {
  return gulp.src([
      './www/js/*.js',
      './www/js/*/*.js',
    ])
    .pipe(concat('all.hey-community.min.js'))
    .pipe(ngmin())
    // .pipe(uglify({mangle: false}))
    .pipe(uglify())
    .pipe(gulp.dest('./www/js'));
});
gulp.task('clear-all-js', function() {
  return gulp.src('./www/js/all.hey-community.min.js', {read: false})
    .pipe(clean());
});


// publish index.html
gulp.task('html', function () {
  return gulp.src('./www/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest('www'));
});
