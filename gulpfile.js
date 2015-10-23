var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpify = require('gulpify');

gulp.task('default', function(){});

gulp.task('process-scrips', [
  'process:add-new-currency',
  'process:add-new-currency-minified'
]);

gulp.task('compile-scripts', [
  'compile:add-new-currency',
  'compile:add-new-currency-minified'
]);

gulp.task("process:add-new-currency", function(){
  return gulp.src('src/add-new-currency/**/*.js')
             .pipe(babel())
             .pipe(concat('Flare-AddNewCurrency.js'))
             .pipe(gulp.dest('process/'));
});

gulp.task('compile:add-new-currency', function(){
  return gulp.src('process/Flare-AddNewCurrency.js')
             .pipe(gulpify('Flare-AddNewCurrency.js'))
             .pipe(gulp.dest('dist/'));
})

gulp.task("process:add-new-currency-minified", function(){
  return gulp.src('src/add-new-currency/**/*.js')
             .pipe(babel())
             .pipe(concat('Flare-AddNewCurrency.js'))
             .pipe(uglify({"preserveComments": "all"}))
             .pipe(gulp.dest('process/minified/'));
});

gulp.task('compile:add-new-currency-minified', function(){
  return gulp.src('process/minified/Flare-AddNewCurrency.js')
             .pipe(gulpify('Flare-AddNewCurrency.js'))
             .pipe(gulp.dest('dist/minified/'));
})
