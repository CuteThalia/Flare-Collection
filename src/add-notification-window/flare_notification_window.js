/**
 * @namespace FlareNotification.
 */

var FlareNotificationWindow = require('./windows/flare_notification_window');
var NotificationOptions     = require('./notification_options/notification_options');
var lodashIsUndefined       = require('../../node_modules/lodash/lang/isUndefined');

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
 * @param Should I stay at the top?
 * @desc Should the notification stay at the top?
 * Default: false
 * @default false
 *
 * @param Calulation For Fade out
 * @desc calculate how soon after fade in we should fade out.
 * Default: (175 / 2) + 50
 * @default (175 / 2) + 50
 *
 * @param Show Window?
 * @desc Do we want a window behind the text?
 * Default: true
 * @default true
 *
 * @help
 *
 * Notifications can be created easily, on the fly. Its amazing how easily they
 * can  be created. lets create one together:
 *
 * FlareNotification.notify(text, stickToTop, fadeOutNearBottom);
 *
 * - text: String, accepts short code like color and icon.
 * - StickToTop: Boolean, default false. Sticks to the top of the screen if enabled.
 * - fadeOutNearBottom: Boolean, default false. Fades out using plugin configured fade out time.
 *
 * Text with short codes must use double slash:
 *
 * FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
 *
 * The name of the window can be the same for all of your notifications if
 * you wish. We use, first in, first out concept:
 *
 * FlareNotification.notify("\\i[8] \\c[10]Hello World\\c[0]");
 * FlareNotification.notify("\\i[8] \\c[10]Hello\\c[0]");
 * FlareNotification.notify("\\i[8] \\c[10]World\\c[0]");
 *
 * Hello World is First out then Hello and finally World.
 */

class FlareNotification {

  /**
   * Public API: Notify Window.
   *
   * Creates a window for the que.
   *
   * @param text - text for the window
   */
  static notify(text, stayAtTop, fadeoutTowardsBottom) {
    this._arrayOfNotifications.push({
      windowMethod: new FlareNotificationWindow(),
      text:         text
    });

    var stayAtTop            = false ? lodashIsUndefined(stayAtTop) : stayAtTop;
    var fadeoutTowardsBottom = false ? lodashIsUndefined(fadeoutTowardsBottom) : fadeoutTowardsBottom;

    window._windowOptions = {
      stayAtTop:            stayAtTop,
      fadeoutTowardsBottom: fadeoutTowardsBottom
    };
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

// Do Not touch or manipulate this.
window._windowOptions = {};
