var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require("babelify");


gulp.task('make:flare-currency', function() {
  return browserify({entries: [
        'src/add-new-currency/flare-currency.js',
        'src/add-new-currency/currencies/set_up_currencies.js',
        'src/add-new-currency/update_core_data_manager/data_manager.js',
        'src/add-new-currency/update_core_battle/battle.js',
        'src/add-new-currency/scenes/yanfly_aftermath_scene_battle_update.js',
        'src/add-new-currency/scenes/scene_shop_update.js',
        'src/add-new-currency/windows/shop/window_shop_number.js',
        'src/add-new-currency/windows/shop/window_shop_buy.js',
        'src/add-new-currency/windows/yanfly_aftermath/flare_currency_reward_window.js'
      ]})
      .transform(babelify)
      .bundle()
      .pipe(source('Flare-Currency.js'))
      .pipe(gulp.dest('dist/flare/currency/'));
});

gulp.task('make:flare-notification-window', function() {
  return browserify({entries: [
        'src/add-notification-window/flare_notification_window.js',
        'src/add-notification-window/scene_map_update/scene_map_update.js'
      ]})
      .transform(babelify)
      .bundle()
      .pipe(source('Flare-NotificationWindow.js'))
      .pipe(gulp.dest('dist/flare/notify/'));
});

gulp.task('make:flare-map-exporter', function() {
  return browserify({entries: [
        'src/map-exporter/map_exporter.js',
      ]})
      .transform(babelify)
      .bundle()
      .pipe(source('Flare-MapExporter.js'))
      .pipe(gulp.dest('dist/flare/map_exporter/'));
});
