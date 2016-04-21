var gulp = require("gulp");
var less = require("gulp-less");
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('default', function() {
gulp.src('less/*.less')
  .pipe(less())
  .pipe(rename({
            suffix: '.min'
        }))
  .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
  .pipe(gulp.dest('css'));
})
gulp.task('test', function () {
    return gulp
    .src('testRunner.html')
    .pipe(mochaPhantomJS());
});

gulp.task('watch', function(){
  gulp.watch('less/*.less', ['default'])
})
