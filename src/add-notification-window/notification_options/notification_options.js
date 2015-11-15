/**
 * @namespace FlareNotification.
 */

// Plugin Options.
var FlareNotificationWindow = PluginManager.parameters('Flare-NotificationWindow');

/**
 * Notifiation Options.
 *
 * Set options such as how long till the next window and how long till
 * a window fades out after it fades in.
 */
class NotificationOptions {

  static createNotificationOptions() {
    this._notificationOptions = {
      time_till_next_window: FlareNotificationWindow['Till Next Notification?'],
      fade_out_time: FlareNotificationWindow['How Long Till Notification Fade Out?'],
      stickToTop: FlareNotificationWindow['Should I stay at the top?']
    };
  }

  static getNotificationOptions() {
    return this._notificationOptions;
  }
}

// Private global object.
window._NotificationOptions = NotificationOptions;
_NotificationOptions._notificationOptions = null;

module.exports = NotificationOptions
