/**
 * @namespace FlareNotification.
 */

import FlareNotificationWindow from './windows/flare_notification_window';
import NotificationOptions     from './notification_options/notification_options';
import lodashIsUndefined       from 'lodash/lang/isUndefined';
import WindowOptions           from './notification/window/options';

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
 * @param ---Gold Event---
 * @desc
 *
 * @param Display Gold Notification Event?
 * @desc When party gains gold via events, do we show a notification?
 * Default: true
 * @default true
 *
 * @param Gold Notification Width
 * @desc What width should should the notification window be?
 * Default: 500
 * @default 500
 *
 * @param Gold Notification Font Size
 * @desc What font size should we use on the gold notification window?
 * Default: 20
 * @default 20
 *
 * @param Gold Notification Stay At The Top?
 * @desc Should the gold notification windw stay at the top?
 * Default: false
 * @default false
 *
 * @param Gold Notification Should Fadeout?
 * @desc Should the gold window fade out if it isn't staying at the top?
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
 *
 * === Notification on event gain ===
 *
 * These options above only affect the notification windows that appear when
 * the player interacts with events that help either gain or loose items, gold,
 * armor or weapons.
 *
 * They are global across all "event notification windows" and cannot individually
 * be changed.
 *
 */

class FlareNotification {

  /**
   * Public API: Notify Window.
   *
   * Creates a window for the que.
   *
   * @param text - text for the window
   */
  static notify(text, stayAtTop, fadeoutTowardsBottom, options) {
    this._arrayOfNotifications.push({
      windowMethod: new FlareNotificationWindow(options),
      text:         text
    });

    var stayAtTop            = false ? lodashIsUndefined(stayAtTop) : stayAtTop;
    var fadeoutTowardsBottom = false ? lodashIsUndefined(fadeoutTowardsBottom) : fadeoutTowardsBottom;

    WindowOptions.setOption('shouldWeStayAtTop', stayAtTop);
    WindowOptions.setOption('shouldWeFadeOutTowardsBottom', fadeoutTowardsBottom);
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
