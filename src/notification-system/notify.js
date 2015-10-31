var FlareNotificationWindow = require ('./windows/notify_window');

class FlareNotifications {

  static createNotificationWindow() {
    var n = new FlareNotificationWindow();
    n.open();
  }

  static shouldWeCreateWindow() {
    if (this._createWindow === undefined) {
      return false;
    }

    return this._createWindow;
  }
}

window.FlareNotifications = FlareNotifications;
