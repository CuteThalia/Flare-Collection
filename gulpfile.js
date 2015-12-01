var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require("babelify");

gulp.task('make:flare-currency', function() {
  return browserify({entries: [
        'src/add-new-currency/flare-currency.js',
        'src/add-new-currency/update_scene/scene_menu_updates.js',
        'src/add-new-currency/update_window/window_menu_base.js',
        'src/add-new-currency/currencies/set_up_currencies.js',
        'src/add-new-currency/update_core_data_manager/data_manager.js',
        'src/add-new-currency/update_core_battle/battle.js',
        'src/add-new-currency/update_scene/yanfly_aftermath_scene_battle_update.js',
        'src/add-new-currency/update_scene/scene_shop_update.js',
        'src/add-new-currency/windows/shop/window_shop_number.js',
        'src/add-new-currency/windows/shop/window_shop_buy.js',
        'src/add-new-currency/windows/yanfly_aftermath/flare_currency_reward_window.js'
      ]})
      .transform("babelify")
      .bundle()
      .pipe(source('Flare-Currency.js'))
      .pipe(gulp.dest('dist/flare/currency/'));
});

gulp.task('make:flare-notification-window', function() {
  return browserify({entries: [
        'src/add-notification-window/flare_notification_window.js',
        'src/add-notification-window/scene_map_update/scene_map_update.js',
        'src/add-notification-window/update_game_interpreter/update_game_interpreter.js'
      ]})
      .transform(babelify)
      .bundle()
      .pipe(source('Flare-NotificationWindow.js'))
      .pipe(gulp.dest('dist/flare/notify/'));
});

gulp.task('make:flare-laws-for-map', function() {
  return browserify({entries: [
        'src/laws-for-map/update_window/window_base_update.js',
        'src/laws-for-map/flare_laws_for_map.js',
        'src/laws-for-map/update_scene/scene_menu_update.js',
        'src/laws-for-map/update_window/window_menu_base.js',
        'src/laws-for-map/update_scene/scene_base_update.js',
        'src/laws-for-map/update_core_game_action/game_action_update.js',
        'src/laws-for-map/update_core_game_map/game_map_update.js',
        'src/laws-for-map/update_core_battle_manager/battle_manager_update.js',
        'src/laws-for-map/update_scene/yanfly_aftermath_update.js'
      ]})
      .transform(babelify)
      .bundle()
      .pipe(source('Flare-LawsForMap.js'))
      .pipe(gulp.dest('dist/flare/laws_for_map/'));
});
