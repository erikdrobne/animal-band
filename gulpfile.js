var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    sass   = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver');

var styles = [
        'src/assets/sass/main.scss'
    ],
    jsFiles = [
        'node_modules/pixi.js/dist/pixi.min.js',
        'vendor/dragonBones/dragonBones.js',
        'vendor/dragonBones/dragonBonesPixi.js',
        'node_modules/requirejs/require.js'
    ];

gulp.task('copy-html', function() {
    gulp.src('index.html').pipe(gulp.dest('build'));
});

gulp.task('copy-img', function() {
    gulp.src('src/assets/img/**/*.{gif,jpg,png,svg}').pipe(gulp.dest('build/assets/img'));
});

gulp.task('copy-animation', function() {
    gulp.src('src/assets/animations/**/*.{atlas,png,json}').pipe(gulp.dest('build/assets/animations'));
});

gulp.task('copy-sounds', function() {
    gulp.src('src/assets/sounds/**/*.*').pipe(gulp.dest('build/assets/sounds'));
});

gulp.task('build-css', function(done) {
    gulp.src(styles)
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/assets/css/'))
        .on('end', done);
});

gulp.task('build-js-vendor', function() {
    return gulp.src(jsFiles)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('build-js-components', function() {
    return gulp.src('src/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build'))
        .pipe(jshint({
            lookup: true
        }))
        .pipe(jshint.reporter('default'));
});

gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
      directoryListing: {
          livereload: true,
          enable: true,
          path: 'index'
      },
      open: true,
      port:3002
    }));
});

gulp.task('default', ['copy-html', 'copy-img', 'copy-sounds', 'build-css', 'build-js-vendor', 'build-js-components', 'copy-animation', 'webserver'], function() {
    gulp.watch('src/assets/sass/**/*.scss', ['build-css']);
    gulp.watch('src/assets/img/**/*.{gif,jpg,png,svg}', ['copy-img']);
    gulp.watch('src/assets/animations/**/*.{atlas,png, json}', ['copy-animation']);
    gulp.watch('src/assets/sounds/**/*.*', ['copy-sounds']);
    gulp.watch('index.html', ['copy-html']);
    gulp.watch('src/**/*.js', ['build-js-components']);
});
