var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', [
  'process:add-new-currency',
  'process:add-new-currency-minified'
]);

gulp.task("process:add-new-currency", function(){
  return gulp.src('src/add-new-currency/**/*.js')
             .pipe(babel())
             .pipe(concat('Flare-AddNewCurrency.js'))
             .pipe(gulp.dest('process/'));
});

gulp.task("process:add-new-currency-minified", function(){
  return gulp.src('src/add-new-currency/**/*.js')
             .pipe(babel())
             .pipe(concat('Flare-AddNewCurrency.js'))
             .pipe(uglify({"preserveComments": "all"}))
             .pipe(gulp.dest('process/minified/'));
});
