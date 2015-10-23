var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', [
  'compile:add-new-currency',
  'compile:add-new-currency-minified'
]);

gulp.task("compile:add-new-currency", function(){
  return gulp.src('src/add-new-currency/**/*.js')
             .pipe(babel())
             .pipe(concat('Flare-AddNewCurrency.js'))
             .pipe(gulp.dest('dist/'));
});

gulp.task("compile:add-new-currency-minified", function(){
  return gulp.src('src/add-new-currency/**/*.js')
             .pipe(babel())
             .pipe(concat('Flare-AddNewCurrency.js'))
             .pipe(uglify({"preserveComments": "all"}))
             .pipe(gulp.dest('dist/minified/'));
});
