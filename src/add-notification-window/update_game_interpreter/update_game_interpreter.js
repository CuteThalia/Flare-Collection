import NotificationOptions from '../notification_options/notification_options';

// Change Gold
Game_Interpreter.prototype.command125 = function() {
    var value = this.operateValue(this._params[0], this._params[1], this._params[2]);

    this.processNotificationEvents("Gold", "showGoldNotificationEvent", value, {
      moveDown:       NotificationOptions.getNotificationOptions().goldNotificationWindowMoveDown,
      fadeOut:        NotificationOptions.getNotificationOptions().goldNotificationWindowFadeOut,
      windowOptions:  {
        windowWidth: NotificationOptions.getNotificationOptions().goldNotificationWindowWidth,
        fontSize:    NotificationOptions.getNotificationOptions().goldNotificationFontSize
      }
    });

    $gameParty.gainGold(value);
    return true;
};

/**
 * Allows us to process notification options.
 *
 * @param string type - The type for the message, might be weapons, armors, items, gold and so on.
 * @param strink showKey - The key to be used to find if we should show the notification.
 * @param int value - value for the notification window.
 * @param object options - options for the notification window.
 */
Game_Interpreter.prototype.processNotificationEvents = function(type, showKey, value, options) {
  if (NotificationOptions.getNotificationOptions()[showKey]) {
    if (value < 0) {
      FlareNotification.notify(
        "\\c[16]Looses "+type+"\\c[0]: " + Math.abs(value),
        options.moveDown,
        options.fadeOut,
        options.windowOptions
      );
    } else {
      FlareNotification.notify(
        "\\c[16]Gains "+type+"\\c[0]: " + Math.abs(value),
        options.moveDown,
        options.fadeOut,
        options.windowOptions
      );
    }
  }
}
