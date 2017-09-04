var gulp = require('gulp'),
    shell = require('gulp-shell'),
		minifyHTML = require('gulp-minify-html'),
		sass = require('gulp-sass'),
    importCss = require('gulp-import-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    glob = require('glob'),
		imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jpegtran = require('imagemin-jpegtran'),
    gifsicle = require('imagemin-gifsicle'),
    optipng = require('imagemin-optipng');

gulp.task('jekyll', function() {
  return gulp.src('index.html', { read: false })
    .pipe(shell([
      'jekyll build'
  ]));
});

gulp.task('html', ['jekyll'], function() {
    return gulp.src('_site/**/*.html')
        .pipe(minifyHTML({
            quotes: true
        }))
        .pipe(gulp.dest('_site/'));
});

gulp.task('css', ['jekyll'], function() {
   return gulp.src('css/style.scss')
       .pipe(sass())
       .pipe(importCss())
       .pipe(autoprefixer())
       .pipe(uncss({
           html: glob.sync("_site/**/*.html"),
           ignore: [
               'label.active',
               '.dark-mode',
               'span.tweet-time',
               /(#|\.)(is-)/,
               /(#|\.)(has-)/,
               /(#|\.)(js-)/
          ]
       }))
       .pipe(minifyCss({keepBreaks:false}))
       .pipe(rename('style.min.css'))
       .pipe(gulp.dest('_site/style/'));
});

gulp.task('images', ['jekyll'], function () {
    return gulp.src('images/**')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant(), jpegtran(), optipng(), gifsicle()]
        }))
        .pipe(gulp.dest('_site/images'));
});

gulp.task('build', [ 'css', 'images', 'html']);
