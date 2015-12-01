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
      timeTillNextWindow:  FlareNotificationWindow['Till Next Notification?'],
      fadeOutTime:          FlareNotificationWindow['How Long Till Notification Fade Out?'],
      stickToTop:           FlareNotificationWindow['Should I stay at the top?'],
      fadeOutCalculation:   FlareNotificationWindow['Calulation For Fade out'],
      showWindow:            FlareNotificationWindow['Show Window?'],
      windowGainWidth:      FlareNotificationWindow['Window width'],
      windowGainFontSize:  FlareNotificationWindow['Window font size'],
      windowGainMoveDown:  FlareNotificationWindow['Should window stay at the top?'],
      windowGainFadeOut:   FlareNotificationWindow['Should the window fade out?'],
    };
  }

  static getNotificationOptions() {
    return this._notificationOptions;
  }
}

// Private global object.
window._NotificationOptions = NotificationOptions;

module.exports = NotificationOptions
