var FlareNotificationWindow = require('./windows/flare_notification_window');

class FlareNotification {

  static createNewScene() {
    this._windowOpen = true;
  }

  static _isWindowOpen() {
    if (this._windowOpen === undefined) {
      this._windowOpen = false;
    }

    return this._windowOpen;
  }

  static _windowIsNotOpen() {
    this._windowOpen = false;
  }
}

window.FlareNotification = FlareNotification;
