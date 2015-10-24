var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require("babelify");


gulp.task('make:flare-currency', function() {
    return browserify('src/add-new-currency/flare-currency.js')
        .transform(babelify)
        .bundle()
        .pipe(source('Flare-Currency.js'))
        .pipe(gulp.dest('dist/flare/currency/'));
});
