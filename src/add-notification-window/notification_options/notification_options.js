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

    var windowGainMoveDown = false;
    var windowGainFadeOut  = false;

    if (FlareNotificationWindow['Should window stay at the top?'] === "true") {
      windowGainMoveDown = true;
    }

    if (FlareNotificationWindow['Should the window fade out?'] === "true") {
      windowGainFadeOut = true;
    }

    this._notificationOptions = {
      timeTillNextWindow:   FlareNotificationWindow['Till Next Notification?'],
      fadeOutTime:          FlareNotificationWindow['How Long Till Notification Fade Out?'],
      stickToTop:           FlareNotificationWindow['Should I stay at the top?'],
      fadeOutCalculation:   FlareNotificationWindow['Calulation For Fade out'],
      showWindow:           FlareNotificationWindow['Show Window?'],
      windowGainWidth:      parseInt(FlareNotificationWindow['Window width']),
      windowGainFontSize:   parseInt(FlareNotificationWindow['Window font size']),
      windowGainMoveDown:   windowGainMoveDown,
      windowGainFadeOut:    windowGainFadeOut,
    };
  }

  static getNotificationOptions() {
    return this._notificationOptions;
  }
}

// Private global object.
window._NotificationOptions = NotificationOptions;

module.exports = NotificationOptions
