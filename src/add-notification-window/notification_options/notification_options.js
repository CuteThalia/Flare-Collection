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
    this.getGoldInformation(FlareNotificationWindow);

    this._notificationOptions = {
      timeTillNextWindow:             FlareNotificationWindow['Till Next Notification?'],
      fadeOutTime:                    FlareNotificationWindow['How Long Till Notification Fade Out?'],
      stickToTop:                     FlareNotificationWindow['Should I stay at the top?'],
      fadeOutCalculation:             FlareNotificationWindow['Calulation For Fade out'],
      showWindow:                     FlareNotificationWindow['Show Window?'],
      showGoldNotificationEvent:      FlareNotificationWindow['Display Gold Notification Event?'],
      goldNotificationWindowWidth:    parseInt(FlareNotificationWindow['Gold Notification Width']),
      goldNotificationFontSize:       parseInt(FlareNotificationWindow['Gold Notification Font Size']),
      goldNotificationWindowMoveDown: this._goldNotificationWindowMoveDown,
      goldNotificationWindowFadeOut:  this._goldNotificationWindowFadeOut,
    };

    console.log(this._notificationOptions);
  }

  static getNotificationOptions() {
    return this._notificationOptions;
  }

  static getGoldInformation(pluginOptions) {
    this._goldNotificationWindowMoveDown = false;
    this._goldNotificationWindowFadeOut  = false;

    if (pluginOptions['Gold Notification Stay At The Top?'] === "true") {
      this._goldNotificationWindowMoveDown = true;
    }

    if (pluginOptions['Gold Notification Should Fadeout?'] === "true") {
      this._goldNotificationWindowFadeOut = true;
    }
  }
}

// Private global object.
window._NotificationOptions = NotificationOptions;

module.exports = NotificationOptions
