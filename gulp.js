var gulp = require('gulp');
var babel = require('gulp-bable');
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
             .pipe(gulp.dest('dist/AddNewCurrency.js'));
});

gulp.task("compile:add-new-currency-minified", function(){
  return gulp.src('src/add-new-currency/**/*.js')
             .pipe(babel())
             .pipe(concat('AddNewCurrency.js'))
             .pipe(uglify({"preserveComments": true}))
             .pipe(gulp.dest('dist/Flare-AddNewCurrency.min.js'));
});
