/**
 * @namespace FlareNotification.
 */

var FlareNotificationWindow = require('./windows/flare_notification_window');
var NotificationOptions     = require('./notification_options/notification_options');

/*:
 * @plugindesc Allows you to create notifications for player based events.
 * @author Adam Balan (AKA: DarknessFalls)
 *
 * @param Till Next Notification?
 * @desc How long should we wait before displaying the next notification?
 * Default: 175
 * @default 175
 *
 * @param How Long Till Notification Fade Out?
 * @desc How long before the notification fades out?
 * Default: 175
 * @default 175
 *
 *
 * @help
 *
 * Notifications can be created easily, on the fly. Its amazing how easily they
 * can  be created. lets create one together:
 *
 * FlareNotification.notify(name, text);
 *
 * - name: String, name is the name of the window. All windows are pushed to
 *         a queue that is then cycled through over time. Time being the option
 *         of: Till Next Notification?
 *
 * - text: String, accepts short code like color and icon.
 *
 * Text with short codes must use double slash:
 *
 * FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
 *
 * The name of the window can be the same for all of your notifications if
 * you wish. We use, first in, first out concept:
 *
 * FlareNotification.notify("window name", "\\i[8] \\c[10]Hello World\\c[0]");
 * FlareNotification.notify("window name", "\\i[8] \\c[10]Hello\\c[0]");
 * FlareNotification.notify("window name", "\\i[8] \\c[10]World\\c[0]");
 *
 * Hello World is First out then Hello and finally World.
 */

class FlareNotification {

  /**
   * Public API: Notify Window.
   *
   * Creates a window for the que.
   *
   * @param name - name of the window for the queue.
   * @param text - text for the window
   */
  static notify(name, text) {
    this._arrayOfNotifications.push({
      name:         name,
      windowMethod: new FlareNotificationWindow(),
      text:         text
    });
  }

  /**
   * Private Method.
   *
   * Check if the queue array length is greator then 0.
   *
   * @return bool
   */
  static _isThereAQueue() {
    if (this._arrayOfNotifications.length > 0) {
      return true;
    }

    return false;
  }

  /**
   * Private Methd
   *
   * Gets the queue array.
   *
   * @return Array
   */
  static _getQueue() {
    return this._arrayOfNotifications;
  }
}

window.FlareNotification = FlareNotification;

// Set up the options.
_NotificationOptions.createNotificationOptions();

// Do not touch or manipulate this.
FlareNotification._arrayOfNotifications = [];
