// run the FOLLOWING BEFORE trying to run gulp
// npm install gulp-cli -g
// npm install gulp -D
// npm install
//
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var concat      = require('gulp-concat');
var cleanCSS    = require('gulp-clean-css');
var postcss     = require('gulp-postcss');
var mqpacker    = require('css-mqpacker');
var rename      = require("gulp-rename");
var uglify      = require('gulp-uglify');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build',
  syncStarted: '<span style="color: blue">Running:</span> $ sync sass',
  syncStartedjs: '<span style="color: red">Running:</span> $ sync js'
};


// ########### Variables ############
var jsSources = [
  'assets/js/vendor/modernizr-custom.js',
  'assets/js/vendor/bootstrap.min.js',
  'assets/js/vendor/detectmobilebrowser.js',
  'assets/js/plugins.js',
  'assets/js/main.js',
];


// ########### Tasks ############
/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build', 'sass', 'bundle-js'], function() {
    browserSync.init({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds). Also create minified versions for production use.
 */
gulp.task('sass', function () {
  browserSync.notify(messages.syncStarted);
    return gulp.src('assets/_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(postcss([mqpacker]))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(gulp.dest('assets/css'))
        .pipe(cleanCSS({
          compatibility: 'ie9',
          processImportFrom: ['!fonts.googleapis.com']
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('assets/_scss/*.scss', ['sass']);
  gulp.watch(jsSources, ['bundle-js']);
  gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Copy assets to Drupal Theme Directory. Copies images, css and js
 */
 // gulp.task('sync-sass', ['sass'], function () {
 //   browserSync.notify(messages.syncStarted);
 //   return gulp.src('assets/**/*.*')
 //   .pipe(gulp.dest('../docroot/assets'));
 // });
 // gulp.task('sync-js', ['bundle-js'], function () {
 //   browserSync.notify(messages.syncStartedjs);
 //   return gulp.src('assets/**/*.*')
 //   .pipe(gulp.dest('../docroot/assets'));
 // });

/**
 * Bundle js files together and then created minified versions and publish them to the correct locations.
 */
gulp.task('bundle-js', function() {
  browserSync.notify(messages.syncStartedjs);
  return gulp.src(jsSources).pipe(concat('bundle.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('assets/js'))
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(browserSync.stream());
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
